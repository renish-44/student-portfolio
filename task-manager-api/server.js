require('dotenv').config(); // Practical 5: load dotenv at the very top
const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Practical 5: Connect with mongoose BEFORE app.listen
connectDB().then(() => {
  app.use(logger);
  app.use(express.json());
  
  app.use('/tasks', taskRoutes);
  
  app.get('/error-test', (req, res, next) => {
    throw new Error('This is a simulated synchronous error!');
  });
  
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
