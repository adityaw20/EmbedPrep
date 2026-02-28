const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login, verifyToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Validation
const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/login', loginValidation, login);
router.get('/verify', authenticate, verifyToken);

module.exports = router;
