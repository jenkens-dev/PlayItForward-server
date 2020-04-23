const { gql } = require('apollo-server');

const nonprofit = gql`
  type Nonprofit {
    id: Int!
    contact: String
    description: String
    logo: String
    displayName: String
    mission: String
    username: String!
    events: [Event!]
  }

  type Query {
    getNonprofits: [Nonprofit!]!
    getNonprofit(id: Int!): Nonprofit!
  }

  type Mutation {
    createNonprofit(username: String!): Nonprofit!
  }
`;



module.exports = nonprofit;
