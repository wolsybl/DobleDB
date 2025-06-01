const mongoose = require('mongoose');

module.exports = (db) => {
  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

  return db.model('Task', taskSchema);
};
