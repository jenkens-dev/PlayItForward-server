import bcrypt from 'bcrypt';
import { tryLogin } from '../auth';
import formatErrors from '../formatErrors';

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
  Volunteer: {
    events: async ({ id }, args, { models }) => {
      const volunteer = await models.volunteer.findOne({ where: id });
      const eventVolunteers = await models.eventVolunteer.findAll({
        where: { volunteerId: volunteer.id },
      });
      return eventVolunteers.map((eventVolunteer) => {
        return models.event.findOne({
          where: { id: eventVolunteer.eventId },
        });
      });
    },
  },
};
