// import { AWSS3Uploader } from '../lib/uploaders/s3.ts';

// const s3Uploader = new AWSS3Uploader({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   destinationBucketName: 'test-graphql-uploads',
// });

// const resolvers = {
//   Mutation: {
//     singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
//   },
// };


export default {
  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { stream, filename, mimetype, encoding } = await file;

      // Do work 💪

      return { filename, mimetype, encoding, url: '' };
    },
  },
};
