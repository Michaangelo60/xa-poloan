const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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
    const emailDebug = String(process.env.EMAIL_DEBUG || '').toLowerCase() === 'true';
    const transportOpts = { host, port, secure, auth, logger: emailDebug, debug: emailDebug };
    // avoid logging secrets
    const logSafe = { host, port, secure, user: auth && auth.user ? auth.user : undefined, debug: emailDebug };
    console.debug('Creating email transporter', logSafe);
    const transporter = nodemailer.createTransport(transportOpts);
    // Helpful quick verification during startup/send.
    transporter.verify().then(() => {
      console.debug('Email transporter verified OK', logSafe);
    }).catch(err => {
      console.warn('Email transporter verify failed', err && err.message ? err.message : String(err));
      if (emailDebug && err && err.stack) console.warn(err.stack);
    });
    return transporter;
  } catch (err) {
    console.error('createTransporter error', err);
    return null;
  }
}

async function sendEmail(to, subject, html, text, attachments) {
  try {
    // Development fallback: if EMAIL_FAKE=true or EMAIL_BACKEND=file, write email to disk
    const useFileBackend = (String(process.env.EMAIL_FAKE || '').toLowerCase() === 'true')
      || (String(process.env.EMAIL_BACKEND || '').toLowerCase() === 'file');
    if (useFileBackend) {
      try {
        const outDir = path.join(__dirname, '..', 'tmp_emails');
        fs.mkdirSync(outDir, { recursive: true });
        const fileName = `${Date.now()}-${(Math.random()*1e9|0)}.json`;
        const filePath = path.join(outDir, fileName);
        const payload = { to, subject, text: text || null, html: html || null, attachments: attachments || null, createdAt: new Date().toISOString() };
        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
        console.info('Email written to file (EMAIL_FAKE active):', filePath);
        return { ok: true, info: { file: filePath } };
      } catch (fileErr) {
        console.error('EMAIL_FAKE file write failed', fileErr);
        return { ok: false, error: String(fileErr) };
      }
    }
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email not configured (SMTP_HOST missing) — skipping sendEmail');
      return { ok: false, error: 'Email not configured' };
    }
    const from = process.env.NOTIFY_FROM || process.env.SMTP_USER || 'no-reply@example.com';
    const mailOpts = { from, to, subject, text: text || undefined, html: html || undefined };
    if (attachments && Array.isArray(attachments) && attachments.length > 0) mailOpts.attachments = attachments;
    try {
      const info = await transporter.sendMail(mailOpts);
      return { ok: true, info: { messageId: info && info.messageId, response: info && info.response } };
    } catch (sendErr) {
      console.error('sendEmail sendMail error', sendErr && sendErr.message ? sendErr.message : sendErr);
      return { ok: false, error: sendErr && sendErr.message ? sendErr.message : String(sendErr) };
    }
  } catch (err) {
    console.error('sendEmail error', err && err.message ? err.message : err);
    return { ok: false, error: err && err.message ? err.message : String(err) };
  }
}

module.exports = { sendEmail };
