export default (sequelize, DataTypes) => {
  const Nonprofit = sequelize.define('nonprofit', {
    contact: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    displayName: DataTypes.STRING,
    mission: DataTypes.STRING,
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
  });

  Nonprofit.associate = (models) => {
    Nonprofit.hasMany(models.event);
  };

  return Nonprofit;
};
