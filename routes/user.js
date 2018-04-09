const mongoose = require('mongoose');
const User = mongoose.model('User');
const recognitionApi = require('../api/recognition-api');

async function list(req, res) {
  const users = await User.find();

  res.json(users);
}

function create(req, res) {
  const user = new User({
    nickname: req.body ? req.body.nickname : null,
  });

  return new Promise((resolve, reject) => {
    user.validate(async (error) => {
      if (error) {
        return reject(error);
      }

      user.recognitionPersonId = await recognitionApi.createPerson(
        user.nickname
      );

      await user.save();

      res.json(user);

      resolve(user);
    });
  });
}

async function update(req, res) {
  const user = await User.findOne({
    nickname: req.body ? req.body.nickname : null,
  });

  const recognitionFaceIds = await Promise.all(
    // TODO for now it's just takes all files from request, but we need to take in mention input name
    Object.values(req.files).map((file) =>
      recognitionApi.addFace(user.recognitionPersonId, file.data)
    )
  );

  user.recogitionFaceIds = user.recogitionFaceIds.concat(recognitionFaceIds);

  await user.save();

  res.json(user);
}

async function identify(req, res) {
  const personIds = await recognitionApi.identify(req.files.photo.data);

  const user = await User.findOne({
    recognitionPersonId: personIds[0],
  });

  res.json(user);
}

module.exports = function() {
  const router = this.Router();

  router.get('/', list);
  router.post('/', create);
  router.put('/', update);
  router.post('/identify/', identify);

  this.use('/user/', router);
};
