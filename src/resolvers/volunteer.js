const bcrypt = require('bcrypt');
const _ = require('lodash');

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

const resolvers = {
  Query: {
    getVolunteer: (parent, { id }, { models }) => {
      return models.volunteer.findOne({ where: { id } });
    },
  },
  Mutation: {
    registerVolunteer: async (
      parent,
      { password, ...otherArgs },
      { models },
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const volunteer = await models.volunteer.create({
          ...otherArgs,
          password: hashedPassword,
        });
        return {
          ok: true,
          volunteer,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};

module.exports = resolvers;
