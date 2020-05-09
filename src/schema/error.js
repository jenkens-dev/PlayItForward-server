const { gql } = require('apollo-server');

const error = gql`
  type Error {
    path: String!
    message: String
  }
`;

module.exports = error;
