#!/usr/bin/env node
const path = require('path');
// Load env from backend/.env (script lives in backend/bin)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const config = require('../config/config');
const { connectDB } = require('../db');
const User = require('../models/User');
const { hashPassword } = require('../services/hashService');
const mongoose = require('mongoose');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((a) => {
    const [k, v] = a.split('=');
    if (k && v) args[k.replace(/^--/, '')] = v;
  });
  return args;
}

async function main() {
  const args = parseArgs();
  const adminId = args.id || config.ADMIN_ID;
  const adminEmail = args.email || config.ADMIN_EMAIL || `admin-${String(adminId || '').slice(0,6)}@local`;
  const name = args.name || 'Admin';

  if (!adminId) {
    console.error('No admin id provided. Use --id=<mongoId> or set ADMIN_ID in .env');
    process.exit(1);
  }

  console.log('Connecting to DB...');
  await connectDB(config.MONGO_URI);

  let user = null;
  try {
      if (mongoose.Types.ObjectId.isValid(adminId)) user = await User.findById(adminId);
  } catch (e) { /* ignore */ }

  if (user) {
    console.log('Admin user already exists:', user._id.toString(), user.email);
    process.exit(0);
  }

  const pwd = Math.random().toString(36).slice(2);
  const passwordHash = await hashPassword(pwd);

  const createData = { name, email: adminEmail, passwordHash, role: 'admin' };
  if (mongoose.Types.ObjectId.isValid(adminId)) createData._id = new mongoose.Types.ObjectId(adminId);

  try {
    const created = await User.create(createData);
    console.log('Created admin user:');
    console.log('  id:   ', created._id.toString());
    console.log('  email:', created.email);
    console.log('  password (random):', pwd);
    console.log('You can now use this id in the admin UI or set ADMIN_ID in your .env');
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin user', err);
    process.exit(2);
  }
}

main().catch(err => { console.error(err); process.exit(3); });
