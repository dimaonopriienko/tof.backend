const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
  },
  recognitionPersonId: {
    type: String,
    require: true,
    unique: true,
  },
  recogitionFaceIds: {
    type: [String],
  },
});

schema.set('timestamps', true);

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
