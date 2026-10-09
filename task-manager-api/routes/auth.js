const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const requireJson = require('../middleware/requireJson');

// Apply requireJson and validation middleware before controllers
router.post('/register', requireJson, validateRegister, register);
router.post('/login', requireJson, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
