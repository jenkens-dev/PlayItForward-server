export default (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('volunteer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Please provide a username' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Please provide a password' },
      },
    },
    image: DataTypes.STRING,
    bio: DataTypes.STRING,
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
  });

  Volunteer.associate = (models) => {
    Volunteer.belongsToMany(models.event, {
      through: models.eventVolunteer,
      foreignKey: 'volunteerId',
    });
  };

  return Volunteer;
};
