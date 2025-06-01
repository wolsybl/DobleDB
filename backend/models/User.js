const mongoose = require('mongoose');

module.exports = (db) => {
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

  return db.model('User', userSchema);
};
