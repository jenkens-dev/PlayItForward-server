import AWS from 'aws-sdk';
import { ApolloServerFileUploads } from '../index';
import stream from 'stream';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class AWSS3Uploader implements ApolloServerFileUploads.IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: 'us-west-2',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: 'pif-bucket',
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string,
  ): string {
    return fileName;
  }

  async singleFileUploadResolver(
    parent,
    { file }: { file: ApolloServerFileUploads.File },
  ): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    console.log(file);
    const { stream, filename, mimetype, encoding } = await file;
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding,
    );
    const uploadStream = this.createUploadStream(filePath);

    stream.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    const link = result.Location;

    return { filename, mimetype, encoding, url: result.Location };
  }
}
