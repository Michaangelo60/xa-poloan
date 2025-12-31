const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Listing: allow optional auth (controller enforces per-user access rules).
const optionalAuth = require('../middleware/optionalAuth');
router.get('/', optionalAuth, transactionController.getTransactions);

// Create transaction (allow anonymous or authenticated)
router.post('/', authMiddleware, transactionController.createTransaction);

// Update transaction status (e.g., webhook or dev simulation)
router.patch('/:id/status', authMiddleware, transactionController.updateTransactionStatus);

// Admin routes removed

module.exports = router;
