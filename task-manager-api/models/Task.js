const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Practical 7: Task ownership ref
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { 
    type: String, 
    required: [true, "Title is required"] 
  },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: { values: ["low", "medium", "high"], message: "Priority must be low, medium or high" },
    default: "medium"
  },
  createdAt: { type: Date, default: Date.now }
});

// Hooks for trimming (from Practical 6)
TaskSchema.pre('save', function (next) {
  if (this.title) this.title = this.title.trim();
  next();
});

TaskSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.title) update.title = update.title.trim();
  if (update.$set && update.$set.title) update.$set.title = update.$set.title.trim();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
