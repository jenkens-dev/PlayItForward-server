const bcrypt = require('bcrypt');
const _ = require('lodash');
const { tryLogin } = require('../auth');

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

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
    events: ({id}, args, {models}) => models.event.findAll({nonprofitId: id})
  }
};

module.exports = resolvers;
