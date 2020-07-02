import { gql } from 'apollo-server';

export default gql`
  type Nonprofit {
    id: Int!
    contact: String!
    description: String!
    logo: String!
    displayName: String!
    mission: String!
    username: String!
    events: [Event!]
  }

  type Query {
    getNonprofits: [Nonprofit!]!
    getNonprofit(id: Int!): Nonprofit!
  }

  type LoginResponse {
    ok: Boolean!
    nonprofit: Nonprofit
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    registerNonprofit(
      username: String!
      password: String!
      mission: String!
      description: String!
      displayName: String!
      contact: String!
    ): LoginResponse!
    loginNonprofit(username: String!, password: String!): LoginResponse!
  }
`;
