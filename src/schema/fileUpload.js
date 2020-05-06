const { gql } = require('apollo-server');

const fileUpload = gql`
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

module.exports = fileUpload;
