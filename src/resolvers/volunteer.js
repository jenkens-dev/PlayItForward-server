const resolvers = {
  Query: {
    getVolunteer: (parent, { id }, { models }) => {
      return models.volunteer.findOne({ where: { id } });
    },
  },
  Mutation: {
    createVolunteer: (parent, args, { models }) => {
      return models.volunteer.create(args);
    },
  },
};

module.exports = resolvers;
