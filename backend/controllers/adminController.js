const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { emitToUser, emitToAdmins } = require('../services/socketService');

exports.listPending = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    else filter.status = 'Pending';
    const items = await Transaction.find(filter).sort({ timestamp: -1 }).limit(200);
    return res.json({ isOk: true, data: items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isOk: false, error: 'Server error' });
  }
};

// Approve transaction and trigger membership logic if applicable
exports.approveTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const tx = await Transaction.findById(id) || await Transaction.findOne({ transactionId: id });
    if (!tx) return res.status(404).json({ isOk: false, error: 'Transaction not found' });

    tx.status = 'Completed';
    await tx.save();

    // If this was a loan, create a disbursement deposit and apply balances server-side
    try {
      if (tx.type && String(tx.type).toLowerCase() === 'loan' && (tx.loanAmount || 0) > 0 && tx.userId) {
        const deposit = {
          type: 'deposit',
          amount: Number(tx.loanAmount || 0),
          currency: tx.currency || 'USD',
          status: 'Completed',
          timestamp: new Date().toISOString(),
          userId: tx.userId,
          userName: tx.userName || '',
          userEmail: tx.userEmail || '',
          description: 'Loan disbursement',
          collateralBTC: 0,
          loanAmount: 0,
          transactionId: (tx.transactionId ? String(tx.transactionId) : String(tx._id || Date.now())) + '_DISB'
        };
        const createdDep = await Transaction.create(deposit);
        // apply to user balances immediately
        try {
          const user = await User.findById(tx.userId);
          if (user) {
            user.savingsBalanceUSD = (user.savingsBalanceUSD || 0) + Number(createdDep.amount || 0);
            await user.save();
            // mark deposit applied
            createdDep.appliedToBalances = true;
            await createdDep.save();
            try { emitToUser(tx.userId, 'user:updated', { id: user._id, savingsBalanceUSD: user.savingsBalanceUSD, collateralBalanceUSD: user.collateralBalanceUSD }); } catch (e) {}
          }
        } catch (e) { console.warn('apply loan disbursement to user failed', e && e.message); }
        // notify user about the new deposit transaction
        try { if (tx.userId) emitToUser(tx.userId, 'transaction:created', createdDep); } catch (e) {}
      }
    } catch (e) { console.warn('creating disbursement on approve failed', e && e.message); }

    // notify user about transaction update
    try {
      if (tx.userId) emitToUser(tx.userId, 'transaction:updated', tx);
    } catch (e) { console.warn('emitToUser failed on admin approve', e && e.message); }
    // notify other admins about the change
    try { emitToAdmins('transaction:updated', tx); } catch (e) { /* ignore */ }

    // membership update logic
    try {
      const s = String(tx.status || '').toLowerCase();
      const isCompleted = s === 'completed' || s === 'confirmed' || s === 'complete';
      const isMembershipTx = (tx.type && tx.type.toLowerCase() === 'membership')
        || (tx.type && tx.type.toLowerCase() === 'deposit' && (tx.amount || 0) >= 1000 && String(tx.description || '').toLowerCase().includes('membership'));
      if (isMembershipTx && isCompleted && tx.userId) {
        const user = await User.findById(tx.userId);
        if (user) {
          user.isMember = true;
          user.membershipPaidAmount = tx.amount || user.membershipPaidAmount || 0;
          user.membershipPaidAt = tx.timestamp ? new Date(tx.timestamp) : new Date();
          const paidAt = user.membershipPaidAt || new Date();
          const expires = new Date(paidAt);
          expires.setFullYear(expires.getFullYear() + 1);
          user.membershipExpiresAt = expires;
          await user.save();
          emitToUser(tx.userId, 'user:updated', { id: user._id, isMember: user.isMember, membershipPaidAmount: user.membershipPaidAmount, membershipPaidAt: user.membershipPaidAt, membershipExpiresAt: user.membershipExpiresAt });
        }
      }
    } catch (e) {
      console.warn('Membership update failed on admin approve:', e && e.message);
    }

    // send payment confirmation email (best-effort)
    try {
      if (tx.userId) {
        const user = await User.findById(tx.userId);
        if (user && user.email) {
          const ttype = tx.type || 'Payment';
          const subject = `Payment confirmed: ${ttype}`;
          const amount = (typeof tx.amount !== 'undefined' && tx.amount !== null) ? `${tx.amount} ${tx.currency || ''}`.trim() : '—';
          const reference = tx.transactionId || String(tx._id || '');
          const html = `<p>Hi ${user.name || ''},</p>
            <p>Your ${ttype.toLowerCase()} has been confirmed by our team.</p>
            <p><strong>Type:</strong> ${ttype}<br/>
            <strong>Amount:</strong> ${amount}<br/>
            <strong>Reference:</strong> ${reference}<br/>
            <strong>Date:</strong> ${tx.timestamp ? new Date(tx.timestamp).toLocaleString() : new Date().toLocaleString()}</p>
            <p>If you have questions reply to this email or contact support.</p>`;

          sendEmail(user.email, subject, html, `Your ${ttype} of ${amount} has been confirmed. Reference: ${reference}`).then(r => {
            if (!r.ok) console.warn('Payment confirmation email not sent', r.error);
          }).catch(e => console.warn('sendEmail promise rejected for payment confirmation', e && e.message));
        }
      }
    } catch (e) {
      console.warn('Payment confirmation email failed:', e && e.message);
    }

    return res.json({ isOk: true, data: tx });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isOk: false, error: 'Server error' });
  }
};

// Fetch transactions for a specific user. Query with ?email=... or ?userId=...
exports.getUserTransactions = async (req, res) => {
  try {
    const { email, userId } = req.query;
    let user = null;
    if (email) user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user && userId) user = await User.findById(userId).catch(() => null);

    if (!user) {
      // If no user found, return empty list rather than 404 to make the admin UX simpler.
      return res.json({ isOk: true, data: [] });
    }

    const items = await Transaction.find({ userId: user._id }).sort({ timestamp: -1 }).limit(500);
    return res.json({ isOk: true, data: items });
  } catch (err) {
    console.error('getUserTransactions error', err);
    return res.status(500).json({ isOk: false, error: 'Server error' });
  }
};
