const errorHandler = (err, req, res, next) => {
  // Logs err.stack on the server only
  console.error('SERVER ERROR LOG:', err.stack);

  let statusCode = err.status || 500;
  let errorResponse = { success: false };

  // Practical 5: Structured error handling for Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse.error = 'Validation failed';
    errorResponse.details = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
  } else if (err.name === 'CastError') {
    statusCode = 400;
    errorResponse.error = `Invalid format for ${err.path}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    errorResponse.error = 'Duplicate key error. A record with this value already exists.';
  } else {
    // Malformed JSON (express.json() sets status 400) or anything else
    errorResponse.error = statusCode === 500 ? 'Internal Server Error' : err.message;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
