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
router.patch('/me', authMiddleware, validateProfile, authController.updateProfile);

module.exports = router;
