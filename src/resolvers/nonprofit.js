const resolvers = {
  Query: {
    getNonprofit: (parent, { id }, { models }) => {
      return models.nonprofit.findOne({ where: { id } });
    },
    getNonprofits: (parent, args, { models }) => {
      return models.nonprofit.findAll();
    },
  },

  Mutation: {
    createNonprofit: (parent, args, { models }) => {
      return models.nonprofit.create(args);
    },
  },
};

module.exports = resolvers;
