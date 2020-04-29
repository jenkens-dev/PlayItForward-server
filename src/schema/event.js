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

  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createEvent(title: String!, nonprofitId: Int!): Event!
    addVolunteer(username: String!, eventId: Int!): VoidResponse!
  }
`;

module.exports = event;
