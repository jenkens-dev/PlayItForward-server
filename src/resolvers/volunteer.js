const resolvers = {
  Query: {
    getVolunteer: (parent, { id }, { models }) =>
      models.volunteer.findOne({ where: { id } }),
  },
  Mutation: {
    createVolunteer: (parent, args, { models }) =>
      models.volunteer.create(args),
  },
};

module.exports = resolvers;
