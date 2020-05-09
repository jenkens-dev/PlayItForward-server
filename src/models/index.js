const Sequelize = require('sequelize');

const sequelize = new Sequelize('pif', 'postgres', 'postgres', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  event: sequelize.import('./event'),
  nonprofit: sequelize.import('./nonprofit'),
  volunteer: sequelize.import('./volunteer'),
  eventVolunteer: sequelize.import('./event_volunteer'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
