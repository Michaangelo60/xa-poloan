const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/xapobank',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8000'
  ,ADMIN_EMAIL: process.env.ADMIN_EMAIL || null
  ,ADMIN_ID: process.env.ADMIN_ID || null
};
