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

  type Mutation {
    createVolunteer(username: String!): Volunteer!
  }
`;

module.exports = volunteer;
