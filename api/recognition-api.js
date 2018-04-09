const recognitionApiConfig = require('../configs/recognition-api');
const oxford = require('project-oxford');
const client = new oxford.Client(
  recognitionApiConfig.key,
  recognitionApiConfig.region
);

module.exports = {
  createPersonGroupIfNotExists: async function() {
    try {
      await client.face.personGroup.get(recognitionApiConfig.personGroupId);
    } catch (e) {
      if (e.code === recognitionApiConfig.errorsCodes.personGroupNotFound) {
        return await client.face.personGroup.create(
          recognitionApiConfig.personGroupId,
          recognitionApiConfig.personGroupName
        );
      }

      throw e;
    }
  },
  createPerson: async function(nickname) {
    const response = await client.face.person.create(
      recognitionApiConfig.personGroupId,
      nickname
    );

    return response.personId;
  },
  addFace: async function(personId, image) {
    const response = await client.face.person.addFace(
      recognitionApiConfig.personGroupId,
      personId,
      {
        data: image,
      }
    );

    await this.train();

    return response.persistedFaceId;
  },
  train: async function() {
    // TODO trainingStart can take a lot of time so we need to handle training status by `trainingStatus` call
    return await client.face.personGroup.trainingStart(
      recognitionApiConfig.personGroupId
    );
  },
  identify: async function(image) {
    const detectResponse = await client.face.detect({
      data: image,
      returnFaceId: true,
    });

    const faceIds = detectResponse.map((face) => face.faceId);

    const identifyResponse = await client.face.identify(faceIds, {
      personGroupId: recognitionApiConfig.personGroupId,
    });

    return identifyResponse
      .map((data) => data.candidates.map((candidate) => candidate.personId))
      .reduce(
        (personIds, candidatePersonIds) => personIds.concat(candidatePersonIds),
        []
      );
  },
};
