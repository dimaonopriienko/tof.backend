const recognitionApi = require('../api/recognition-api');

module.exports = function(done) {
  recognitionApi
    .createPersonGroupIfNotExists()
    .then(() => done())
    .catch((e) => console.error(e.message));
};
