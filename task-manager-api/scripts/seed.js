require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/Task');

const run = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error("Safety check: Cannot run seed script in production!");
    process.exit(1);
  }

  const userId = process.argv[2];
  const count = parseInt(process.argv[3], 10) || 500;
  const shouldClear = process.argv.includes('--clear');

  if (!userId || userId.length !== 24) {
    console.error("Usage: node scripts/seed.js <userId> [count] [--clear]");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    if (shouldClear) {
      await Task.deleteMany({ user: userId });
      console.log(`Cleared existing tasks for user ${userId}.`);
    }

    console.log(`Generating ${count} tasks...`);
    const tasks = Array.from({ length: count }).map((_, i) => ({
      user: userId,
      title: `Generated Benchmark Task ${i + 1}`,
      description: `Automatically generated data for caching tests. ID: ${Math.random()}`,
      completed: Math.random() > 0.5,
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
    }));

    await Task.insertMany(tasks);
    console.log(`Successfully inserted ${count} tasks.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
