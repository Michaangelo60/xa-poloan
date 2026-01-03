const nodemailer = require('nodemailer');

// Reads SMTP configuration from env. Set the following in backend/.env:
// SMTP_HOST, SMTP_PORT, SMTP_SECURE (true/false), SMTP_USER, SMTP_PASS, NOTIFY_FROM

function createTransporter() {
  let hostRaw = process.env.SMTP_HOST || '';
  if (!hostRaw) return null;
  // sanitize host: if user accidentally pasted a URL (e.g. http://localhost:8000)
  // extract only the hostname portion so nodemailer does DNS lookups correctly.
  try {
    if (/^https?:\/\//i.test(hostRaw)) {
      const u = new URL(hostRaw);
      hostRaw = u.hostname;
    } else {
      hostRaw = hostRaw.split('/')[0];
    }
  } catch (e) {
    // fallback: keep original hostRaw
  }
  const host = hostRaw;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || 'false') === 'true';
  const auth = process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined;
  try {
    return nodemailer.createTransport({ host, port, secure, auth });
  } catch (err) {
    console.error('createTransporter error', err);
    return null;
  }
}

async function sendEmail(to, subject, html, text, attachments) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email not configured (SMTP_HOST missing) — skipping sendEmail');
      return { ok: false, error: 'Email not configured' };
    }
    const from = process.env.NOTIFY_FROM || process.env.SMTP_USER || 'no-reply@example.com';
    const mailOpts = { from, to, subject, text: text || undefined, html: html || undefined };
    if (attachments && Array.isArray(attachments) && attachments.length > 0) mailOpts.attachments = attachments;
    const info = await transporter.sendMail(mailOpts);
    return { ok: true, info };
  } catch (err) {
    console.error('sendEmail error', err);
    return { ok: false, error: err };
  }
}

module.exports = { sendEmail };
