module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define(
    'volunteer',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: DataTypes.STRING,
      bio: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { underscored: true },
  );

  //   Volunteer.associate = (models) => {
  //     Volunteer.belongsTo(models.nonprofit, {
  //       foreignKey: 'nonprofitId',
  //     });
  //   };

  return Volunteer;
};
