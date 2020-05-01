const { ApolloServer } = require('apollo-server');
const models = require('./models');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const cors = require('cors');

const SECRET = 'ahduojaknsdajkdahlnsjd';
const SECRET2 = 'adhalsdjasdnlajghuadh';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const server = new ApolloServer({
  cors: {
    origin: '*',
  },
  typeDefs,
  resolvers,
  context: { models, SECRET, SECRET2 },
});

models.sequelize.sync({ force: false }).then(() => {
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
