export default (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    location: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      defaultValue: 's3://pif-bucket/pif-logo 6.07.41 PM.png',
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.nonprofit, {
      foreignKey: 'nonprofitId',
    });
    Event.belongsToMany(models.volunteer, {
      through: models.eventVolunteer,
      foreignKey: 'eventId',
    });
  };

  return Event;
};
