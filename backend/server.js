require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./db');
const config = require('./config/config');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const webhookRoutes = require('./routes/webhooks');
const testEmailRoutes = require('./routes/testEmail');
const supportRoutes = require('./routes/support');
const identityRoutes = require('./routes/identity');
const devRoutes = require('./routes/dev');

const app = express();

app.use(cors());
app.use(express.json());

// Development-friendly Content Security Policy to allow local sockets and API calls.
// This keeps the site reasonably locked down while letting the frontend talk to
// the local backend and socket endpoints during development.
app.use((req, res, next) => {
  // More permissive CSP for local development and DevTools (keeps site secure while
  // allowing devtools/dev servers, sockets and local API calls). Tighten for production.
  // Development CSP: allow connections to localhost and devtools targets.
  // NOTE: this is permissive for local development only. Tighten for production.
  const csp = "default-src 'self' http: https: data: blob:; " +
    // Allow connections to local backend, sockets and DevTools-specific endpoints for development
    "connect-src 'self' http://localhost:5000 http://127.0.0.1:5000 http://127.0.0.1 ws://localhost:5000 wss://localhost:5000 http://localhost https://localhost https://api.coingecko.com chrome-devtools://* devtools://*; " +
    "img-src 'self' data: file: blob: https:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com http://localhost:5000; " +
    "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;";
  res.setHeader('Content-Security-Policy', csp);
  next();
});

// Serve a small appspecific manifest to satisfy Chrome DevTools requests (dev only)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  console.log('Serving /.well-known/appspecific/com.chrome.devtools.json');
  res.type('application/json');
  res.send(JSON.stringify({ name: 'xapobank-dev', url: config.CLIENT_URL || 'http://localhost:8000' }));
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/test', testEmailRoutes);
  // Dev helper routes (only use in local/dev environment)
  app.use('/api/dev', devRoutes);

// Lightweight health check for load balancers and Render
app.get('/api/health', (req, res) => {
  try {
    return res.json({ ok: true, uptime: process.uptime(), timestamp: Date.now() });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// Determine frontend folder location. Prefer a copied local folder (backend/frontend-xapobank)
// so deploy systems that copy the frontend into the backend directory (postinstall) work.
const frontendLocal = path.join(__dirname, 'frontend-xapobank');
const frontendSibling = path.join(__dirname, '..', 'frontend-xapobank');
const frontendRoot = fs.existsSync(frontendLocal) ? frontendLocal : frontendSibling;
console.log('Frontend static root:', frontendRoot);

// Serve frontend static files (optional)
app.use(express.static(frontendRoot));
// Also serve the sign-up / sign-in pages under /signsignup URI by mapping to the
// frontend-xapobank folder (these files live in frontend-xapobank). This allows
// requests to /signsignup/signin.html and /signsignup/signup.html to resolve.
app.use('/signsignup', express.static(frontendRoot));
// Also allow the explicit folder path to be reachable (so requests to
// /frontend-xapobank/index.html work and receive the server CSP headers).
app.use('/frontend-xapobank', express.static(frontendRoot));

// Explicit fallback routes for sign-in / sign-up to avoid 404s when static
// middleware or deploy layout differs. These send the exact HTML files if present
// and otherwise return 404 so logs expose the missing-file path.
app.get(['/signsignup/signin.html', '/signin.html'], (req, res) => {
  const file = path.join(frontendRoot, 'signin.html');
  if (fs.existsSync(file)) return res.sendFile(file);
  console.warn('signin.html not found at', file);
  return res.status(404).send('signin.html not found');
});

app.get(['/signsignup/signup.html', '/signup.html'], (req, res) => {
  const file = path.join(frontendRoot, 'signup.html');
  if (fs.existsSync(file)) return res.sendFile(file);
  console.warn('signup.html not found at', file);
  return res.status(404).send('signup.html not found');
});

// Catch-all under /signsignup: try to serve the requested file, else fall back to signin.html
app.get('/signsignup/*', (req, res, next) => {
  const rel = req.path.replace(/^\/signsignup\//, '');
  const candidate = path.join(frontendRoot, rel);
  if (fs.existsSync(candidate)) return res.sendFile(candidate);
  const fallback = path.join(frontendRoot, 'signin.html');
  if (fs.existsSync(fallback)) return res.sendFile(fallback);
  next();
});
// Serve the standalone admin site so it can be accessed over HTTP (avoids file:// CSP restrictions)
app.use('/admin', express.static(path.join(__dirname, '..', 'transaction-admin-site')));
// Admin UI removed

const start = async () => {
  try {
    await connectDB(config.MONGO_URI);
    const server = require('http').createServer(app);
    // initialize socket service
    const { init: initSockets } = require('./services/socketService');
    initSockets(server);
    // serve uploaded files
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    // identity routes
    app.use('/api/identity', identityRoutes);
      // support route
      app.use('/api/support', supportRoutes);
    // mount webhook routes
    app.use('/api/webhooks', webhookRoutes);
    server.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();

module.exports = app;

