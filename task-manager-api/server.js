require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // Practical 7

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
  
  // Practical 7: Logger does not log req.body to ensure passwords stay out of logs
  app.use(logger);
  app.use(express.json());
  
  // Pipeline: logger -> cors -> express.json -> routes -> notFound -> errorHandler
  app.use('/auth', authRoutes);
  app.use('/tasks', taskRoutes);
  
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
