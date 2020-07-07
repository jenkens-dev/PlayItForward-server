import { AWSS3Uploader } from '../src/lib/uploaders/s3';

const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  destinationBucketName: 'pif-bucket',
});

s3Uploader.singleFileUploadResolver.bind(s3Uploader);

export default s3Uploader;
