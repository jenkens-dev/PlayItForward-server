import { ApolloServer } from 'apollo-server';
import models from './models';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

const SECRET = 'ahduojaknsdajkdahlnsjd';
const SECRET2 = 'adhalsdjasdnlajghuadh';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: { models, SECRET, SECRET2 },
});

models.sequelize.sync({ force: false }).then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
