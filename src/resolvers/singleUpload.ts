import { AWSS3Uploader } from '../lib/uploaders/s3';

const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  destinationBucketName: 'pif-bucket',
});

const resolvers = {
  Mutation: {
    singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
  },
};

module.exports = resolvers;
