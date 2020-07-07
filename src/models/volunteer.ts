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
    image: {
      type: DataTypes.STRING,
      defaultValue:
        'https://pif-bucket.s3-us-west-2.amazonaws.com/default-profile-picture1.jpg',
    },
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
