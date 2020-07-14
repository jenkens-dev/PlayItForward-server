import { gql } from 'apollo-server';

export default gql`
  type Event {
    id: Int!
    image: String!
    title: String!
    date: String!
    location: String!
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
    createEvent(
      title: String!
      file: Upload!
      date: String!
      location: String!
      nonprofitId: Int!
    ): Event!
    addVolunteer(username: String!, eventId: Int!): VoidResponse!
  }
`;
