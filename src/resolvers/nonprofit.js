const resolvers = {
  Query: {
    getNonprofit: (parent, { id }, { models }) =>
      models.nonprofit.findOne({ where: { id } }),
    getNonprofits: (parent, args, { models }) =>
      models.nonprofit.findAll()
  },

  Mutation: {
    createNonprofit: (parent, {username}, { models }) => models.nonprofit.create(username)
  }
};

module.exports = resolvers;
