const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateProfile = require('../middleware/validateProfile');

router.post('/login', authController.login);
router.post('/telegram', authController.telegramLogin);
router.post('/register', authController.register);
router.post('/forgot', authController.forgotPassword);
router.post('/reset', authController.resetPassword);
router.get('/me', authMiddleware, authController.me);
router.patch('/me', authMiddleware, validateProfile, authController.updateProfile);




// admin endpoints removed

module.exports = router;
