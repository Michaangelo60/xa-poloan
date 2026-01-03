const User = require('../models/User');
const { hashPassword, comparePassword } = require('../services/hashService');
const { signToken } = require('../services/tokenService');
const config = require('../config/config');
const crypto = require('crypto');
const path = require('path');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, country } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already exists' });
    const passwordHash = await hashPassword(password);
    const user = await User.create({ name: fullName, email, passwordHash, phone: phone || '', country: country || '' });
    const payload = { id: user._id, email: user.email, name: user.name, phone: user.phone, country: user.country, createdAt: user.createdAt, isMember: user.isMember, role: user.role };
    const token = signToken({ id: user._id, email: user.email, name: user.name, role: user.role });

    // send welcome email (best-effort, non-blocking) with header image attachment
    try {
      const { sendEmail } = require('../services/emailService');
      const { welcomeNotification } = require('../templates/emailTemplates');
      const tpl = welcomeNotification(user);
      // Resolve the header SVG logo path in the frontend folder
      const headerPath = path.resolve(__dirname, '..', '..', 'frontend-xapobank', 'xapo_logo.svg');
      const attachments = [{ filename: 'xapo_logo.svg', path: headerPath, cid: tpl.cid || 'xapo-header' }];
      sendEmail(user.email, tpl.subject, tpl.html, tpl.text, attachments).then(r => {
        if (!r.ok) console.warn('Welcome email not sent', r.error);
      }).catch(e => console.warn('sendEmail promise rejected', e));
    } catch (e) {
      console.warn('Failed to send welcome email', e && e.message);
    }

    return res.status(201).json({ success: true, message: 'Account created', token, data: payload });
  } catch (err) {
    console.error('Register error:', err && err.message ? err.message : err);
    // Handle duplicate key (race conditions) more gracefully
    if (err && err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    return res.status(500).json({ success: false, message: err && err.message ? err.message : 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = signToken({ id: user._id, email: user.email, name: user.name, role: user.role });
    // include createdAt, membership flag and role for client UI
    const payload = { id: user._id, email: user.email, name: user.name, createdAt: user.createdAt, isMember: user.isMember, role: user.role };
    return res.json({ success: true, token, data: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const { name, email, phone, country } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ success: false, message: 'Email already in use' });
      user.email = email;
    }

    if (name) user.name = name;
    if (typeof phone !== 'undefined') user.phone = phone;
    if (typeof country !== 'undefined') user.country = country;

    await user.save();
    const cleaned = { id: user._id, name: user.name, email: user.email, phone: user.phone, country: user.country };
    return res.json({ success: true, message: 'Profile updated', data: cleaned });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Request a password reset: generate token, save to user, email link
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ success: true, message: "If that email exists, we've sent instructions" });

    const token = crypto.randomBytes(24).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(expires);
    await user.save();

    try {
      const { sendEmail } = require('../services/emailService');
      // Prefer explicit CLIENT_URL, but fall back to the request origin so local dev works
      const origin = (req && (req.get && (req.get('origin') || req.protocol + '://' + req.get('host')))) || config.CLIENT_URL || 'http://localhost:5000';
      const resetBase = (config.CLIENT_URL && config.CLIENT_URL !== 'http://localhost:8000') ? config.CLIENT_URL.replace(/\/$/, '') : origin.replace(/\/$/, '');
      const resetUrl = `${resetBase}/reset-password.html?token=${token}&email=${encodeURIComponent(user.email)}`;
      const subject = 'Reset your password';
      const html = `<p>Hi ${user.name || ''},</p><p>We received a request to reset your password. Click the link below to set a new password (link expires in 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, ignore this email.</p>`;
      // Log the reset URL for local testing when SMTP isn't configured
      console.log('Password reset URL (for testing):', resetUrl);
      sendEmail(user.email, subject, html).then(r => {
        if (!r.ok) console.warn('Reset email not sent', r.error);
      }).catch(e => console.warn('sendEmail promise rejected', e));
    } catch (e) {
      console.warn('Failed to send reset email', e && e.message);
    }

    return res.json({ success: true, message: 'If that email exists we sent instructions' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Perform password reset using token
exports.resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;
    if (!email || !token || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const user = await User.findOne({ email, resetPasswordToken: token });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid token or email' });
    if (!user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Token expired' });
    }

    user.passwordHash = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ success: true, message: 'Password has been updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

