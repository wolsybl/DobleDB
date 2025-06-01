
const mongoose = require('mongoose');

const authDB = mongoose.createConnection('mongodb://auth-db:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const crudDB = mongoose.createConnection('mongodb://crud-db:27017/crudDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { authDB, crudDB };
