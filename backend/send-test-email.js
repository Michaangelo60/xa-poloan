require('dotenv').config();
const nodemailer = require('nodemailer');

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 465);
const secure = (process.env.SMTP_SECURE || 'true') === 'true';
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.FROM_EMAIL || user;
const to = process.argv[2] || process.env.SEND_TEST_TO;

if (!user || !pass) {
  console.error('Missing SMTP_USER or SMTP_PASS in environment. Fill backend/.env with Gmail app password.');
  process.exit(1);
}
if (!to) {
  console.error('Provide a recipient as the first argument or set SEND_TEST_TO in .env');
  console.error('Usage: node send-test-email.js recipient@example.com');
  process.exit(1);
}

async function run() {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    logger: true,
    debug: true
  });

  try {
    await transporter.verify();
    console.log('Transporter verified: connection/auth OK');
  } catch (vErr) {
    console.error('Transport verification failed:', vErr && vErr.message ? vErr.message : vErr);
    throw vErr;
  }

  const info = await transporter.sendMail({
    from,
    to,
    subject: 'XapoBank SMTP test',
    text: 'This is a test email sent from the XapoBank backend via Gmail SMTP.'
  });

  console.log('Message sent:', info.messageId || info.response);
}

run().catch(err => { console.error('Send failed:', err); process.exit(1); });
