const bcrypt = require('bcrypt');
const formatErrors = require('../formatErrors');
const { tryLogin } = require('../auth');

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
    loginNonprofit: (
      parent,
      { username, password, type },
      { models, SECRET, SECRET2 },
    ) => tryLogin(username, password, type, models, SECRET, SECRET2),
    registerNonprofit: async (
      parent,
      { password, ...otherArgs },
      { models },
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        let nonprofit = await models.nonprofit.create({
          ...otherArgs,
          password: hashedPassword,
        });
        return {
          ok: true,
          nonprofit,
        };
      } catch (err) {
        return { ok: false, errors: formatErrors(err, models) };
      }
    },
  },
  Nonprofit: {
    events: ({ id }, args, { models }) => {
      return models.event.findAll({ nonprofitId: id });
    },
  },
};

module.exports = resolvers;
