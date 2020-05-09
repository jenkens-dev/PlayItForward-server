import AWS from 'aws-sdk';
import { ApolloServerFileUploads } from '../index';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export class AWSS3Uploader implements ApolloServerFileUploads.IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'us-west-2',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  async singleFileUploadResolver(
    parent,
    { file }: { file: Promise<ApolloServerFileUploads.File> },
  ): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    // Todo next!
    return null;
  }
}
