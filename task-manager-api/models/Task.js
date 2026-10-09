const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"] // Practical 5: schema-level validation
  },
  description: { 
    type: String 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  priority: {
    type: String,
    enum: { 
      values: ["low", "medium", "high"], 
      message: "Priority must be low, medium or high" 
    },
    default: "medium"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Practical 5: pre-save hook that trims whitespace from title
TaskSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  next();
});

/* Practical 5 note: A pre('save') hook does not run on update queries like findByIdAndUpdate.
   We can either use a pre('findOneAndUpdate') hook, or fetch the document, update it, and call save().
   I chose to use pre('findOneAndUpdate') so standard update queries automatically trim the title 
   without needing an extra database read just to save the document. */
TaskSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.title = update.title.trim();
  }
  if (update.$set && update.$set.title) {
    update.$set.title = update.$set.title.trim();
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
