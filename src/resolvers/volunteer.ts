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
      { username, password },
      { models, SECRET, SECRET2 },
    ) => tryLogin(username, password, 'volunteer', models, SECRET, SECRET2),
    registerVolunteer: async (
      parent,
      { password, confirmPassword, ...otherArgs },
      { models, SECRET, SECRET2 },
    ) => {
      if (password !== confirmPassword) {
        return {
          ok: false,
          errors: [
            { path: 'password', message: "passwords don't match, try again." },
          ],
        };
      }
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const volunteer = await models.volunteer.create({
          ...otherArgs,
          password: hashedPassword,
        });
        return tryLogin(
          volunteer.username,
          password,
          'volunteer',
          models,
          SECRET,
          SECRET2,
        );
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
