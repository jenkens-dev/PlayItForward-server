module.exports = (sequelize, DataTypes) => {
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
    points: DataTypes.INTEGER,
  });

  Volunteer.associate = (models) => {
    Volunteer.belongsToMany(models.event, {
      through: 'event_volunteer',
      foreignKey: 'volunteerId',
    });
  };

  return Volunteer;
};
