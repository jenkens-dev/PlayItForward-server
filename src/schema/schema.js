const { gql } = require('apollo-server');

const typeDefs = gql`
  type Event {
    id: Int!
    title: String!
    date: String
    address: String
    nonprofit: Nonprofit!
  }

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

  type Volunteer {
    id: Int!
    firstName: String
    lastName: String
    username: String!
    image: String
    bio: String
    points: Int
  }

  type Query {
    events: [Event!]!
    event(id: Int!): Event!
    
    nonprofits: [Nonprofit!]!
    hi: String!
  }
`;

module.exports = typeDefs;
