const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const { signToken } = require('../services/tokenService');
const { hashPassword } = require('../services/hashService');
const config = require('../config/config');

// Dev-only: promote the authenticated user to admin and return a new token
router.post('/promote', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.role = 'admin';
    await user.save();
    const token = signToken({ id: user._id, email: user.email, name: user.name, role: user.role });
    const payload = { id: user._id, email: user.email, name: user.name, createdAt: user.createdAt, isMember: user.isMember, role: user.role };
    return res.json({ success: true, token, data: payload });
  } catch (err) {
    console.error('Dev promote error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Dev-only: create an admin user with provided email/password (only when not in production)
router.post('/create-admin', async (req, res) => {
  try {
    if ((process.env.NODE_ENV || config.NODE_ENV || 'development') === 'production') {
      return res.status(403).json({ success: false, message: 'Not allowed in production' });
    }
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, message: 'email and password required' });
    // If user exists, return token
    let user = await User.findOne({ email });
    if (user) {
      user.role = 'admin';
      await user.save();
      const token = signToken({ id: user._id, email: user.email, name: user.name, role: user.role });
      const payload = { id: user._id, email: user.email, name: user.name, createdAt: user.createdAt, isMember: user.isMember, role: user.role };
      return res.json({ success: true, token, data: payload });
    }

    const passwordHash = await hashPassword(password);
    user = await User.create({ name: name || 'Admin', email, passwordHash, role: 'admin' });
    const token = signToken({ id: user._id, email: user.email, name: user.name, role: user.role });
    const payload = { id: user._id, email: user.email, name: user.name, createdAt: user.createdAt, isMember: user.isMember, role: user.role };
    return res.json({ success: true, token, data: payload });
  } catch (err) {
    console.error('Create-admin error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

