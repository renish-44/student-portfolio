// Practical 7: Hand-written middleware to sanitize and validate input before it hits the controller/DB
const validateRegister = (req, res, next) => {
  let { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', details: errors });
  }

  // Sanitize: whitelist only email and password, trim/lowercase email
  req.body = {
    email: email.trim().toLowerCase(),
    password: password
  };
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }
  
  req.body = { email: email.trim().toLowerCase(), password };
  next();
};

const validateTask = (req, res, next) => {
  const allowedPriorities = ['low', 'medium', 'high'];
  const { title, description, priority, completed } = req.body;
  const isUpdate = req.method === 'PUT';
  const errors = [];

  if (!isUpdate && (!title || typeof title !== 'string' || title.trim().length === 0)) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    errors.push({ field: 'title', message: 'Title cannot be empty' });
  }

  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    errors.push({ field: 'priority', message: 'Priority must be low, medium, or high' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push({ field: 'completed', message: 'Completed must be a boolean' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', details: errors });
  }

  // Sanitize: whitelist allowed fields to prevent mass assignment (e.g. injecting `user` or `_id`)
  const sanitized = {};
  if (title !== undefined) sanitized.title = title.trim();
  if (description !== undefined) sanitized.description = description;
  if (priority !== undefined) sanitized.priority = priority;
  if (completed !== undefined) sanitized.completed = completed;
  
  req.body = sanitized;
  next();
};

module.exports = { validateRegister, validateLogin, validateTask };
