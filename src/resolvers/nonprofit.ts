import bcrypt from 'bcrypt';
import formatErrors from '../formatErrors';
import { tryLogin } from '../auth';


export default {
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
      { username, password },
      { models, SECRET, SECRET2 },
    ) => tryLogin(username, password, 'nonprofit', models, SECRET, SECRET2),
    registerNonprofit: async (
      parent,
      { password, ...args },
      { models, SECRET, SECRET2 },
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const nonprofit = await models.nonprofit.create({
          password: hashedPassword,
          ...args,
        });
        return tryLogin(
          nonprofit.username,
          password,
          'nonprofit',
          models,
          SECRET,
          SECRET2,
        );
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err, models) };
      }
    },
  },
  Nonprofit: {
    events: ({ id }, args, { models }) => {
      return models.event.findAll({ where: { nonprofitId: id } });
    },
  },
};
