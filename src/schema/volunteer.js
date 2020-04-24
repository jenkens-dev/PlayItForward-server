const { gql } = require('apollo-server');

const volunteer = gql`
  type Volunteer {
    id: Int!
    firstName: String
    lastName: String
    username: String!
    image: String
    bio: String
    points: Int
    events: [Event!]
  }

  type Query {
    getVolunteer(id: Int!): Volunteer!
  }

  type RegisterResponse {
    ok: Boolean!
    volunteer: Volunteer
    errors: [Error!]
  }

  type Mutation {
    registerVolunteer(username: String!, password: String!): RegisterResponse!
  }
`;

module.exports = volunteer;
