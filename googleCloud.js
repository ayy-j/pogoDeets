const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
});

const bucketName = process.env.GCS_BUCKET;
const bucket = storage.bucket(bucketName);

async function uploadFile(fileName, data) {
  const file = bucket.file(fileName);
  await file.save(data);
  console.log(`${fileName} uploaded to ${bucketName}.`);
}

module.exports = { uploadFile };
