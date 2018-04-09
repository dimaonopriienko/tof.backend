module.exports = {
  key: process.env.AZURE_FACE_API_KEY,
  region: process.env.AZURE_FACE_API_REGION,
  personGroupId: process.env.AZURE_FACE_API_PERSON_GROUP_ID,
  personGroupName: process.env.AZURE_FACE_API_PERSON_GROUP_NAME,
  errorsCodes: {
    personGroupNotFound: 'PersonGroupNotFound',
  },
};
