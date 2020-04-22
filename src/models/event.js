module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'event',
    {
      title: DataTypes.STRING,
      date: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    { underscored: true },
  );

  Event.associate = (models) => {
    Event.belongsTo(models.nonprofit, {
      foreignKey: 'nonprofitId',
    });
  };

  return Event;
};
