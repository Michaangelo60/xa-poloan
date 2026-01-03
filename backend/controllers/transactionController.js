const Transaction = require('../models/Transaction');
const { sendEmail } = require('../services/emailService');
const { membershipNotification, depositNotification, loanNotification, withdrawalNotification } = require('../templates/emailTemplates');
const path = require('path');
const { verifyToken } = require('../services/tokenService');
const crypto = require('crypto');

async function applyTransactionToUserBalances(tx) {
  try {
    if (!tx || !tx.userId) return;
    // only apply once
    if (tx.appliedToBalances) return;
    const User = require('../models/User');
    const user = await User.findById(tx.userId);
    if (!user) return;

    const type = String(tx.type || '').toLowerCase();
    if (type === 'deposit') {
      // collateral deposits have collateralBTC > 0
      if (tx.collateralBTC && Number(tx.collateralBTC) > 0) {
        user.collateralBalanceUSD = (user.collateralBalanceUSD || 0) + (tx.amount || 0);
      } else {
        // treat other deposits as savings
        user.savingsBalanceUSD = (user.savingsBalanceUSD || 0) + (tx.amount || 0);
      }
      user.idUploadedAt = user.idUploadedAt; // no-op to avoid lint
      await user.save();
      tx.appliedToBalances = true;
      await tx.save();
      // notify user sockets about updated balances
      try { const { emitToUser } = require('../services/socketService'); if (tx.userId) emitToUser(tx.userId, 'user:updated', { id: user._id, savingsBalanceUSD: user.savingsBalanceUSD, collateralBalanceUSD: user.collateralBalanceUSD }); } catch (e) { }
    }
  } catch (e) { console.warn('applyTransactionToUserBalances failed', e && e.message); }
}

exports.createTransaction = async (req, res) => {
  try {
    const tx = req.body || {};
    // Normalize loan transaction amount: if a loan specifies `loanAmount` use it as `amount`
    try {
      if (tx && String(tx.type || '').toLowerCase() === 'loan') {
        const la = Number(tx.loanAmount || tx.amount || 0);
        tx.amount = la;
      }
    } catch (e) { /* non-fatal */ }
    // Enforce that only members can create loans
    if (tx.type && String(tx.type).toLowerCase() === 'loan') {
      if (!req.user || !req.user.id) return res.status(401).json({ isOk: false, error: 'Unauthorized' });
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      if (!user || !user.isMember) return res.status(403).json({ isOk: false, error: 'Loan access restricted to members' });
    }
    // If user is authenticated, attach user info
    if (req.user) {
      tx.userId = tx.userId || req.user.id;
      tx.userEmail = tx.userEmail || req.user.email;
      tx.userName = tx.userName || req.user.name;
    }

    // ensure a transactionId and default status for new transactions
    tx.transactionId = tx.transactionId || `TXN${Date.now()}`;
    tx.status = tx.status || 'pending';

    // If this is a loan request, compute repayment/due date from repaymentPeriod (days)
    try {
      if (tx && String(tx.type || '').toLowerCase() === 'loan') {
        const periodDays = Number(tx.repaymentPeriod || 0) || 0;
        const base = tx.timestamp ? new Date(tx.timestamp) : new Date();
        if (periodDays > 0) {
          const due = new Date(base.getTime() + periodDays * 24 * 60 * 60 * 1000);
          tx.repaymentDate = tx.repaymentDate || due;
          tx.dueDate = tx.dueDate || due;
        }
      }
    } catch (e) { /* non-fatal */ }

    // Avoid creating documents with client-supplied _id which can trigger
    // E11000 duplicate key errors if the client resubmits the same payload.
    const safeTx = { ...tx };
    delete safeTx._id;
    delete safeTx.id;
    delete safeTx.__v;

    let created;
    try {
      created = await Transaction.create(safeTx);
    } catch (createErr) {
      // Handle duplicate-key race: if a document was created concurrently
      // return the existing one when possible instead of failing with 11000.
      if (createErr && createErr.code === 11000) {
        try {
          // Prefer lookup by transactionId if available
          const lookup = safeTx.transactionId ? { transactionId: safeTx.transactionId } : { userId: safeTx.userId };
          const existing = await Transaction.findOne(lookup);
          if (existing) {
            created = existing;
          } else {
            throw createErr;
          }
        } catch (lookupErr) {
          throw createErr;
        }
      } else {
        throw createErr;
      }
    }
    // emit websocket event to user room if possible
    try {
      const { emitToUser, emitToAdmins } = require('../services/socketService');
      if (created.userId) emitToUser(created.userId, 'transaction:created', created);
      // notify admins about new pending transactions so admin UI updates in real-time
      try { if (typeof emitToAdmins === 'function') emitToAdmins('transaction:created', created); } catch(e){}
      // Membership should only be granted when a transaction is completed/confirmed by a provider.
      // Only consider membership if the transaction status indicates completion.
      try {
        const User = require('../models/User');
        const status = String(created.status || '').toLowerCase();
        const isCompleted = status === 'completed' || status === 'confirmed' || status === 'complete';
        const isMembershipTx = (created.type && created.type.toLowerCase() === 'membership')
          || (created.type && created.type.toLowerCase() === 'deposit' && (created.amount || 0) >= 1000 && String(created.description || '').toLowerCase().includes('membership'));
        if (isMembershipTx && isCompleted && created.userId) {
          const user = await User.findById(created.userId);
          if (user) {
            user.isMember = true;
            user.membershipPaidAmount = created.amount || user.membershipPaidAmount || 0;
            user.membershipPaidAt = created.timestamp ? new Date(created.timestamp) : new Date();
            // set expiry one year from payment date
            const paidAt = user.membershipPaidAt || new Date();
            const expires = new Date(paidAt);
            expires.setFullYear(expires.getFullYear() + 1);
            user.membershipExpiresAt = expires;
            // ensure a stable membershipId
            try {
              if (!user.membershipId) user.membershipId = `MBR-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
            } catch (e) { user.membershipId = user.membershipId || `MBR-${Date.now()}`; }
            await user.save();
            // notify the user's sockets about profile change
            emitToUser(created.userId, 'user:updated', { id: user._id, isMember: user.isMember, membershipPaidAmount: user.membershipPaidAmount, membershipPaidAt: user.membershipPaidAt, membershipExpiresAt: user.membershipExpiresAt, membershipId: user.membershipId });
          }
        }
      } catch (e) {
        console.warn('Membership update failed:', e && e.message);
      }
      // If the transaction is already completed, apply balance updates immediately
      try {
        const s = String(created.status || '').toLowerCase();
        const isCompleted = s === 'completed' || s === 'confirmed' || s === 'complete';
        if (isCompleted) await applyTransactionToUserBalances(created);
      } catch (e) { console.warn('apply balances on create failed', e && e.message); }
    } catch (e) {
      console.warn('Socket emit failed:', e.message);
    }
    return res.json({ isOk: true, data: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    // Allow optional auth: if middleware didn't populate `req.user`, try parsing a Bearer token.
    let requester = req.user || {};
    try {
      if ((!requester || !requester.id) && (req.headers && (req.headers.authorization || req.headers.Authorization))) {
        const auth = req.headers.authorization || req.headers.Authorization;
        if (auth && typeof auth === 'string' && auth.startsWith('Bearer ')) {
          const token = auth.split(' ')[1];
          const payload = verifyToken(token);
          if (payload) requester = payload;
        }
      }
    } catch (e) { /* ignore token parse errors */ }
    const filter = {};

    // If a specific userId is requested, only admins can request other users' transactions.
    if (req.query.userId) {
      const requestedUserId = String(req.query.userId);
      const requesterId = requester.id || requester._id || '';
      const isAdmin = (requester.role && String(requester.role).toLowerCase() === 'admin');
      if (!isAdmin && requestedUserId !== String(requesterId)) {
        return res.status(403).json({ isOk: false, error: 'Forbidden: cannot access other users' });
      }
      filter.userId = req.query.userId;
    } else {
      // No explicit userId: if requester is not admin, only return their transactions.
      const isAdmin = (requester.role && String(requester.role).toLowerCase() === 'admin');
      if (!isAdmin) {
        if (requester.id) filter.userId = requester.id;
        else if (requester._id) filter.userId = requester._id;
        else return res.status(403).json({ isOk: false, error: 'Forbidden: must be authenticated' });
      }
      // Admin with no userId will receive all transactions (no filter)
    }

    const items = await Transaction.find(filter).sort({ timestamp: -1 }).limit(200);
    return res.json({ isOk: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: 'Server error' });
  }
};

// Update transaction status endpoint. Expects { status: 'Completed' }
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ isOk: false, error: 'Missing status' });
    const tx = await Transaction.findById(id) || await Transaction.findOne({ transactionId: id });
    if (!tx) return res.status(404).json({ isOk: false, error: 'Transaction not found' });

    // Only allow admins to change transaction status
    const requester = req.user || {};
    if (!(requester.role && String(requester.role).toLowerCase() === 'admin')) {
      return res.status(403).json({ isOk: false, error: 'Forbidden: admin only' });
    }

    const prevStatus = tx.status || '';
    tx.status = status;
    await tx.save();

    // Server-side logging for admin status changes (approve/other)
    try {
      const adminId = (requester && (requester.id || requester._id)) ? (requester.id || requester._id) : (requester && requester.email) || 'unknown-admin';
      const txRef = tx.transactionId || String(tx._id || '');
      const statusLower = String(status || '').toLowerCase();
      const approvedStates = ['completed','confirmed','complete','success','approved'];
      if (approvedStates.includes(statusLower)) {
        console.info(`[ADMIN APPROVE] admin=${adminId} tx=${txRef} from=${prevStatus} to=${status} at=${new Date().toISOString()}`);
      } else {
        console.info(`[ADMIN STATUS CHANGE] admin=${adminId} tx=${txRef} from=${prevStatus} to=${status} at=${new Date().toISOString()}`);
      }
    } catch (e) { console.warn('Admin-approve logging failed', e && e.message); }

    // emit update events to user and admins
    try {
      const { emitToUser, emitToAdmins } = require('../services/socketService');
      if (tx.userId) emitToUser(tx.userId, 'transaction:updated', tx);
      emitToAdmins('transaction:updated', tx);
    } catch (e) { console.warn('emit updates failed:', e && e.message); }

    // If this transaction now qualifies as a completed membership/payment, update user
    try {
      const User = require('../models/User');
      const s = String(status || '').toLowerCase();
      const isCompleted = s === 'completed' || s === 'confirmed' || s === 'complete';
      const isMembershipTx = (tx.type && tx.type.toLowerCase() === 'membership')
        || (tx.type && tx.type.toLowerCase() === 'deposit' && (tx.amount || 0) >= 1000 && String(tx.description || '').toLowerCase().includes('membership'));
      if (isMembershipTx && isCompleted && tx.userId) {
        const user = await User.findById(tx.userId);
        if (user) {
          user.isMember = true;
          user.membershipPaidAmount = tx.amount || user.membershipPaidAmount || 0;
          user.membershipPaidAt = tx.timestamp ? new Date(tx.timestamp) : new Date();
          const paidAt2 = user.membershipPaidAt || new Date();
          const expires2 = new Date(paidAt2);
          expires2.setFullYear(expires2.getFullYear() + 1);
          user.membershipExpiresAt = expires2;
          try {
            if (!user.membershipId) user.membershipId = `MBR-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
          } catch (e) { user.membershipId = user.membershipId || `MBR-${Date.now()}`; }
          await user.save();
          const { emitToUser } = require('../services/socketService');
          emitToUser(tx.userId, 'user:updated', { id: user._id, isMember: user.isMember, membershipPaidAmount: user.membershipPaidAmount, membershipPaidAt: user.membershipPaidAt, membershipExpiresAt: user.membershipExpiresAt, membershipId: user.membershipId });
        }
      }
    } catch (e) {
      console.warn('Membership update on status change failed:', e && e.message);
    }

    // Apply balances when transaction becomes completed
    try {
      const s2 = String(status || '').toLowerCase();
      const isCompleted2 = s2 === 'completed' || s2 === 'confirmed' || s2 === 'complete';
      if (isCompleted2) await applyTransactionToUserBalances(tx);
    } catch (e) { console.warn('apply balances on status change failed', e && e.message); }

    // send payment confirmation email (best-effort)
    try {
      const s3 = String(status || '').toLowerCase();
      const isCompleted3 = s3 === 'completed' || s3 === 'confirmed' || s3 === 'complete';
      if (isCompleted3 && tx.userId) {
        const User = require('../models/User');
        const user = await User.findById(tx.userId);
        if (user && user.email) {
          const ttype = String(tx.type || 'payment').toLowerCase();
          let tpl = null;
          if (ttype === 'membership') tpl = membershipNotification(user, tx);
          else if (ttype === 'deposit') tpl = depositNotification(user, tx);
          else if (ttype === 'loan') tpl = loanNotification(user, tx);
          else if (ttype === 'withdrawal' || ttype === 'withdraw') tpl = withdrawalNotification(user, tx);
          if (tpl) {
            // attach header logo if template uses CID
            const headerPath = path.resolve(__dirname, '..', '..', 'frontend-xapobank', 'xapo_logo.svg');
            const attachments = [{ filename: 'xapo_logo.svg', path: headerPath, cid: (tpl.cid || 'xapo-header') }];
            sendEmail(user.email, tpl.subject, tpl.html, tpl.text, attachments).then(r => {
              if (!r.ok) console.warn('Payment confirmation email not sent', r.error);
            }).catch(e => console.warn('sendEmail promise rejected for payment confirmation', e && e.message));
          } else {
            const subject = `Payment confirmed`;
            const amount = (typeof tx.amount !== 'undefined' && tx.amount !== null) ? `${tx.amount} ${tx.currency || ''}`.trim() : '—';
            const reference = tx.transactionId || String(tx._id || '');
            const html = `<p>Hi ${user.name || ''},</p><p>Your payment has been confirmed.</p><p><strong>Amount:</strong> ${amount}<br/><strong>Reference:</strong> ${reference}</p>`;
            sendEmail(user.email, subject, html, `Your payment of ${amount} has been confirmed. Reference: ${reference}`).catch(() => {});
          }
        }
      }
    } catch (e) {
      console.warn('Payment confirmation email failed on status change:', e && e.message);
    }

    return res.json({ isOk: true, data: tx });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isOk: false, error: 'Server error' });
  }
};
