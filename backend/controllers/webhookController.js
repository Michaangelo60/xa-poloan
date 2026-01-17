const Transaction = require('../models/Transaction');
const { emitToUser } = require('../services/socketService');

// Generic webhook receiver for provider callbacks (example payload normalization).
exports.handleCryptoWebhook = async (req, res) => {
  try {
    // This endpoint expects provider-specific payloads. For demo, accept a normalized body.
    // Expected fields: { address, amountBTC, network, txId, userId, confirmations }
    const { address, amountBTC, network, txId, userId, confirmations } = req.body;
    if (!address || !amountBTC || !txId) return res.status(400).json({ ok: false, message: 'Missing fields' });

    const BTC_PRICE = 86406; // static fallback price; replace with market feed
    const usdAmount = amountBTC * BTC_PRICE;

    const tx = {
      type: 'deposit',
      amount: usdAmount,
      currency: 'BTC',
      status: confirmations && confirmations >= 3 ? 'Confirmed' : 'Pending',
      timestamp: new Date().toISOString(),
      userId: userId || null,
      userName: '',
      userEmail: '',
      description: `On-chain deposit ${network || 'BTC'}`,
      collateralBTC: amountBTC,
      loanAmount: 0,
      repaymentPeriod: 0,
      interestRate: 0,
      withdrawalAddress: address,
      network: network || 'Bitcoin',
      transactionId: txId
    };

    const created = await Transaction.create(tx);
    if (created && created.userId) emitToUser(created.userId, 'transaction:created', created);
    // admin emits removed

    return res.json({ ok: true, data: created });
  } catch (err) {
    console.error('Webhook handling error', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};
