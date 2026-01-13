const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateProfile = require('../middleware/validateProfile');
// Debug: log exported keys from authController to help diagnose undefined handlers
try {
	console.debug('authController exports:', Object.keys(authController || {}));
} catch (e) {}

// Helper to register a route only if the handler exists, otherwise log
function safeRegisterPost(path, handler, name) {
	if (typeof handler === 'function') {
		router.post(path, handler);
	} else {
		console.warn(`Skipping route POST ${path} — handler ${name} is not defined`);
	}
}

safeRegisterPost('/login', authController.login, 'login');
safeRegisterPost('/telegram', authController.telegramLogin, 'telegramLogin');
safeRegisterPost('/register', authController.register, 'register');
safeRegisterPost('/forgot', authController.forgotPassword, 'forgotPassword');
safeRegisterPost('/reset', authController.resetPassword, 'resetPassword');
// admin endpoints removed
router.get('/me', authMiddleware, authController.me);
// Guard GET/PATCH registrations as well to avoid crashing when handlers are missing
function safeRegisterGet(path, ...handlers) {
	const last = handlers[handlers.length - 1];
	if (typeof last === 'function') {
		router.get(path, ...handlers);
	} else {
		console.warn(`Skipping route GET ${path} — final handler is not defined`);
	}
}

function safeRegisterPatch(path, ...handlers) {
	const last = handlers[handlers.length - 1];
	if (typeof last === 'function') {
		router.patch(path, ...handlers);
	} else {
		console.warn(`Skipping route PATCH ${path} — final handler is not defined`);
	}
}

safeRegisterGet('/me', authMiddleware, authController.me);
safeRegisterPatch('/me', authMiddleware, validateProfile, authController.updateProfile);

module.exports = router;
