const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Practical 7: hash the password in ONE place only. We do not use a pre-save hook 
// because if we did, saving a user document for other reasons might trigger a double-hash.
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ 
      success: true, 
      data: { id: newUser._id, email: newUser.email } 
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Practical 7: select the password explicitly since our Schema hides it by default
    const user = await User.findOne({ email }).select('+password');
    
    // Use generic error for BOTH wrong email or wrong password to prevent user enumeration
    const genericError = 'Invalid email or password';

    if (!user) {
      return res.status(401).json({ success: false, error: genericError });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: genericError });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });

    res.status(200).json({
      success: true,
      data: { token, user: { id: user._id, email: user.email } }
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe };
