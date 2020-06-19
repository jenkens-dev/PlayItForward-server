import { gql } from 'apollo-server';

export default gql`
  type Nonprofit {
    id: Int!
    contact: String
    description: String
    logo: String!
    displayName: String!
    mission: String
    username: String!
    events: [Event!]
  }

  type Query {
    getNonprofits: [Nonprofit!]!
    getNonprofit(id: Int!): Nonprofit!
  }

  type RegisterResponse {
    ok: Boolean!
    nonprofit: Nonprofit
    errors: [Error!]
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
      displayName: String!
    ): RegisterResponse!
    loginNonprofit(
      username: String!
      password: String!
    ): LoginResponse!
  }
`;
