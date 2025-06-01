
module.exports = (conn) => {
  const mongoose = require('mongoose');
  const schema = new mongoose.Schema({
    email: String,
    password: String
  });
  return conn.model('User', schema);
};
