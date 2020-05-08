import bcrypt from 'bcrypt';
import _ from 'lodash';
import { tryLogin } from '../auth';

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getVolunteer: (parent, { id }, { models }) => {
      return models.volunteer.findOne({ where: { id } });
    },
  },
  Mutation: {
    loginVolunteer: (
      parent,
      { username, password, type },
      { models, SECRET, SECRET2 },
    ) => tryLogin(username, password, type, models, SECRET, SECRET2),
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
