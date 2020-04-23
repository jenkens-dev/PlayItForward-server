const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    getVolunteer: (parent, { id }, { models }) => {
      return models.volunteer.findOne({ where: { id } });
    },
  },
  Mutation: {
    registerVolunteer: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.volunteer.create({
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
