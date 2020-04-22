const { gql } = require('apollo-server');

const nonprofit = gql`
  type Nonprofit {
    id: Int!
    contact: String!
    description: String
    logo: String
    displayName: String
    mission: String
    username: String!
    events: [Event!]!
  }
`;

module.exports = nonprofit;
