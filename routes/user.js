const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

module.exports = function() {
  this.use('/user/', router);
};
