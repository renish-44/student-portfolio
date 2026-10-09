const mongoose = require('mongoose');

const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  
  // Practical 5: check mongoose.Types.ObjectId.isValid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format. Must be a valid MongoDB ObjectId.'
    });
  }
  
  next();
};

module.exports = validateTaskId;
