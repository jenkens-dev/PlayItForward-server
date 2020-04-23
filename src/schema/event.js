const { gql } = require('apollo-server');

const event = gql`
  type Event {
    id: Int!
    title: String!
    date: String
    address: String
    nonprofit: Nonprofit!
    volunteers: [Volunteer!]
  }

  type Query {
    getEvent(id: Int!): Event!
    getEvents: [Event!]!
  }

  type Mutation {
    createEvent(title: String!, nonprofitId: Int!): Event!
  }
`;

module.exports = event;
