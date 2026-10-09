const jwt = require('jsonwebtoken');

// Practical 7: verify token and attach req.user
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // Practical 7: wrap jwt.verify in try/catch so a bad token never crashes the server
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    // We pass it to next() so our global error handler processes the JWT error gracefully
    next(err);
  }
};

module.exports = { protect };
