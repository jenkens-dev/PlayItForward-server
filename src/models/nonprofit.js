module.exports = (sequelize, DataTypes) => {
  const Nonprofit = sequelize.define('nonprofit', {
    contact: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    displayName: DataTypes.STRING,
    mission: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  Nonprofit.associate = (models) => {
    Nonprofit.hasMany(models.event);
  };

  return Nonprofit;
};
