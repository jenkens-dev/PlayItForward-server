const resolvers = {
  Query: {
    getEvent: (parent, { id }, { models }) => {
      return models.event.findOne({ where: { id } });
    },
    getEvents: (parent, args, { models }) => {
      return models.event.findAll();
    },
  },
  Mutation: {
    createEvent: (parent, args, { models }) => {
      return models.event.create(args);
    },
  },
};

module.exports = resolvers;
