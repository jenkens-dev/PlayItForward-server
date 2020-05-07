import { gql } from 'apollo-server';

export default gql`
  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Mutation {
    singleUpload(file: Upload!): UploadedFileResponse!
  }
`;
