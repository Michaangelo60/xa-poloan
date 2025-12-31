const express = require('express');
const router = express.Router();

// POST /api/test/email
// Body: { to, subject, html, text }
router.post('/email', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body || {};
    if (!to) return res.status(400).json({ ok: false, error: 'Missing `to` in body' });
    const { sendEmail } = require('../services/emailService');
    const result = await sendEmail(to, subject || 'Test email from XapoBank', html || `<p>This is a test email</p>`, text || 'Test email');
    if (!result.ok) return res.status(500).json({ ok: false, error: result.error });
    return res.json({ ok: true, info: result.info });
  } catch (err) {
    console.error('test email error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

module.exports = router;
