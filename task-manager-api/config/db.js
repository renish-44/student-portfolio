const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected'); // Practical 5: log on success
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Practical 5: exit on failure
  }
};

module.exports = connectDB;
