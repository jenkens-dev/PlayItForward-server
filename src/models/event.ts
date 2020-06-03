export default (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    location: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      defaultValue:
        'https://pif-bucket.s3-us-west-2.amazonaws.com/pif-logo+6.07.41+PM.png',
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
