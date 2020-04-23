module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    address: DataTypes.STRING,
  });

  Event.associate = (models) => {
    Event.belongsTo(models.nonprofit, {
      foreignKey: 'nonprofitId',
    });
    Event.belongsToMany(models.volunteer, {
      through: 'event_volunteer',
      foreignKey: 'eventId',
    });
  };

  return Event;
};
