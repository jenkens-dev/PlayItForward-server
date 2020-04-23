const bcrypt = require('bcrypt');

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
    registerNonprofit: async (
      parent,
      { password, ...otherArgs },
      { models },
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.nonprofit.create({
          ...otherArgs,
          password: hashedPassword,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};

module.exports = resolvers;
