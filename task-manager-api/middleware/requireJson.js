const requireJson = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      return res.status(415).json({
        success: false,
        error: 'Unsupported Media Type: Content-Type must be application/json'
      });
    }
  }
  next();
};
module.exports = requireJson;
