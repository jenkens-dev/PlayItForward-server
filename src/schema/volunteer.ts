import { gql } from 'apollo-server';

export default gql`
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

  type LoginResponse {
    ok: Boolean!
    token: String
    volunteer: Volunteer
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    registerVolunteer(
      username: String!
      password: String!
    ): LoginResponse!
    loginVolunteer(username: String!, password: String!): LoginResponse!
  }
`;
