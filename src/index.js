const { ApolloServer, gql } = require('apollo-server');
const data = require('./mockData');
const models = require('./models');

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
    volunteers: [Volunteer!]!
    nonprofits: [Nonprofit!]!
  }
`;

const resolvers = {
  Query: {
    events: () => data.events,
    event: (obj, { id }, context, info) =>
      data.events.find((event) => event.id === id),
    volunteers: () => data.volunteers,
    nonprofits: () => data.nonprofits,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.

models.sequelize.sync({ force: true }).then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
