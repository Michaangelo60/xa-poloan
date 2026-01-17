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

async function sendEmail(to, subject, html, text) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email not configured (SMTP_HOST missing) — skipping sendEmail');
      return { ok: false, error: 'Email not configured' };
    }
    const from = process.env.NOTIFY_FROM || process.env.SMTP_USER || 'no-reply@example.com';
    const info = await transporter.sendMail({ from, to, subject, text: text || undefined, html: html || undefined });
    return { ok: true, info };
  } catch (err) {
    console.error('sendEmail error', err);
    return { ok: false, error: err };
  }
}

function buildLogoUrl() {
  // Prefer explicit EMAIL_LOGO_URL env var, then try CLIENT_URL + /IMG_2730.PNG, else use a small placeholder
  if (process.env.EMAIL_LOGO_URL) return process.env.EMAIL_LOGO_URL;
  const client = process.env.CLIENT_URL || process.env.CLIENT || '';
  try {
    if (client) {
      const c = client.replace(/\/$/, '');
      return c + '/IMG_2730.PNG';
    }
  } catch (e) {}
  return 'https://via.placeholder.com/120x40?text=XapoBank';
}

function buildHtmlTemplate({ preheader, title, heading, bodyHtml, ctaText, ctaUrl }) {
  const logoUrl = buildLogoUrl();
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f6f7fb; margin:0; padding:20px; }
      .card { max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(15,23,42,0.08); }
      .header { padding:20px; display:flex; align-items:center; gap:12px; }
      .logo { height:40px; }
      .content { padding:24px; color:#0f172a; }
      h1 { margin:0 0 8px 0; font-size:20px; color:#0f172a; }
      p { margin:0 0 12px 0; color:#334155; line-height:1.45; }
      .cta { display:inline-block; margin-top:12px; padding:10px 14px; background:#ff6b35; color:white; border-radius:8px; text-decoration:none; }
      .muted { color:#64748b; font-size:13px; }
      .footer { padding:16px 24px; background:#f8fafc; color:#64748b; font-size:12px; }
    </style>
  </head>
  <body>
    <span style="display:none;font-size:1px;color:#fff;">${preheader || ''}</span>
    <div class="card">
      <div class="header">
        <img src="${logoUrl}" alt="logo" class="logo" />
        <div style="flex:1">
          <div style="font-weight:700;color:#0f172a">XapoBank</div>
          <div style="font-size:12px;color:#64748b">Secure crypto-backed lending</div>
        </div>
      </div>
      <div class="content">
        <h1>${heading || title || 'Notification'}</h1>
        ${bodyHtml || ''}
        ${ctaText && ctaUrl ? `<a class="cta" href="${ctaUrl}">${ctaText}</a>` : ''}
      </div>
      <div class="footer muted">If you didn't expect this email, contact support or ignore this message.</div>
    </div>
  </body>
  </html>`;
}

async function sendNotificationEmail(type, user, opts = {}) {
  try {
    const email = (user && (user.email || user.userEmail)) || opts.to;
    if (!email) return { ok: false, error: 'Missing recipient email' };
    const name = (user && (user.name || user.userName)) || 'Customer';
    let subject = 'Notification from XapoBank';
    let preheader = '';
    let heading = '';
    let bodyHtml = '';
    let ctaText = opts.ctaText;
    let ctaUrl = opts.ctaUrl;

    switch ((String(type || '')).toLowerCase()) {
      case 'account_created':
      case 'account creation':
        subject = 'Welcome to XapoBank — your account is ready';
        preheader = 'Your XapoBank account has been created';
        heading = `Welcome, ${name}!`;
        bodyHtml = `<p>We're excited to have you on board. Your account has been successfully created.</p>
          <p class="muted">Get started by verifying your identity and funding your wallet.</p>`;
        ctaText = ctaText || 'Go to Dashboard';
        ctaUrl = ctaUrl || (process.env.CLIENT_URL || 'http://localhost:8000');
        break;
      case 'deposit':
        subject = 'Deposit received — funds added to your account';
        preheader = 'We received your deposit';
        heading = `Deposit confirmed — $${(opts.amount || 0).toFixed ? (opts.amount).toFixed(2) : (opts.amount || 0)}`;
        bodyHtml = `<p>Hi ${name},</p><p>We've received your deposit of <strong>$${Number(opts.amount || 0).toFixed(2)}</strong>. The amount has been added to your wallet balance and ${opts.collateralBTC ? 'counted toward your collateral value.' : 'is now available in your wallet.'}</p>`;
        ctaText = ctaText || 'View Activity';
        ctaUrl = ctaUrl || `${process.env.CLIENT_URL || 'http://localhost:8000'}/#activity`;
        break;
      case 'withdrawal':
      case 'withdraw':
        subject = 'Withdrawal processed';
        preheader = 'Your withdrawal has been processed';
        heading = `Withdrawal of $${Number(opts.amount || 0).toFixed(2)} processed`;
        bodyHtml = `<p>Hi ${name},</p><p>Your withdrawal request of <strong>$${Number(opts.amount || 0).toFixed(2)}</strong> has been processed. If you did not authorize this, contact support immediately.</p>`;
        ctaText = ctaText || 'View Activity';
        ctaUrl = ctaUrl || `${process.env.CLIENT_URL || 'http://localhost:8000'}/#activity`;
        break;
      case 'membership':
      case 'membership_paid':
        subject = 'Membership confirmed — welcome to premium';
        preheader = 'Your membership payment is confirmed';
        heading = `Membership activated`;
        bodyHtml = `<p>Hi ${name},</p><p>Thank you for becoming a member. Your account now has access to the loan program and premium features.</p>`;
        ctaText = ctaText || 'Explore Loans';
        ctaUrl = ctaUrl || `${process.env.CLIENT_URL || 'http://localhost:8000'}/#loans`;
        break;
      case 'loan':
      case 'loan_approved':
      case 'loan_requested':
        subject = opts.approved ? 'Loan approved' : 'Loan request received';
        preheader = 'Update about your loan';
        heading = opts.approved ? 'Your loan is approved' : 'Loan request received';
        bodyHtml = `<p>Hi ${name},</p><p>${opts.approved ? `Your loan of <strong>$${Number(opts.amount || 0).toFixed(2)}</strong> has been approved.` : `We've received your loan request for <strong>$${Number(opts.amount || 0).toFixed(2)}</strong>. Our team will review it and notify you.`}</p>`;
        ctaText = ctaText || 'View Loan';
        ctaUrl = ctaUrl || `${process.env.CLIENT_URL || 'http://localhost:8000'}/#loans`;
        break;
      default:
        subject = opts.subject || subject;
        heading = opts.heading || 'Notification from XapoBank';
        bodyHtml = opts.bodyHtml || `<p>Hi ${name},</p><p>This is a notification regarding your account.</p>`;
        ctaText = ctaText || opts.ctaText;
        ctaUrl = ctaUrl || opts.ctaUrl;
    }

    const html = buildHtmlTemplate({ preheader, title: subject, heading, bodyHtml, ctaText, ctaUrl });
    const text = (opts.plainText || `${heading}\n\n${(opts.amount ? ('$' + Number(opts.amount || 0).toFixed(2)) : '')}`);
    return await sendEmail(email, subject, html, text);
  } catch (e) {
    console.error('sendNotificationEmail failed', e && e.message);
    return { ok: false, error: e };
  }
}

module.exports = { sendEmail, sendNotificationEmail };
