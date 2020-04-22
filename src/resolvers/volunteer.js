const resolvers = {
  Query: {
    getVolunteer: (parent, { id }, { models }) => {
      models.volunteer.findOne({ where: { id } });
    },
  },
  Mutation: {
    createVolunteer: (parent, { username }, { models }) => {
      models.volunteer.create(username);
    },
  },
};

module.exports = resolvers;
