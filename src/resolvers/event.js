const formatErrors = require('../formatErrors');

const resolvers = {
  Query: {
    getEvent: (parent, { id }, { models }) => {
      return models.event.findOne({ where: { id } });
    },
    getEvents: (parent, args, { models }) => {
      return models.event.findAll();
    },
  },
  Mutation: {
    createEvent: (parent, args, { models }) => {
      return models.event.create(args);
    },
    addVolunteer: async (parent, { username, eventId }, { models }) => {
      try {
        const volunteer = await models.volunteer.findOne({
          where: { username },
        });
        const eventVolunteer = await models.eventVolunteer.create({
          volunteerId: volunteer.id,
          eventId: eventId,
        });
        if (!eventVolunteer) {
          return {
            ok: false,
            errors: [{ path: 'username', message: 'bad things' }],
          };
        }
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
  Event: {
    nonprofit: ({ id }, args, { models }) => {
      return models.event.findAll({ nonprofitId: id });
    },
  },
};

module.exports = resolvers;
