const { gql } = require('apollo-server');

const event = gql`
  type Event {
    id: Int!
    title: String!
    date: String
    address: String
    nonprofit: Nonprofit!
    volunteers: [Volunteer!]!
  }
`;

module.exports = event;
