const mongoose = require('mongoose');

module.exports = (db) => {
  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    priority: { type: String, default: "Media" },
    dueDate: Date,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "Pendiente" },
    userEmail: { type: String, required: true }
  });

  return db.model('Task', taskSchema);
};
