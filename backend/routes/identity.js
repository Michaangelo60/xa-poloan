const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identityController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/upload', authMiddleware, identityController.upload);

module.exports = router;
