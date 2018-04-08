const mongoose = require('mongoose');
const dbConfig = require('../configs/db');

module.exports = function() {
  mongoose.Promise = Promise;

  mongoose.connect(dbConfig.url);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Сonnection error:'));
  db.once('open', console.log.bind(console, 'Сonnected to database'));
};
