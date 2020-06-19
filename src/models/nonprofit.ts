export default (sequelize, DataTypes) => {
  const Nonprofit = sequelize.define('nonprofit', {
    contact: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    logo: {
      type: DataTypes.STRING,
      defaultValue:
        'https://pif-bucket.s3-us-west-2.amazonaws.com/pif-logo+6.07.41+PM.png',
    },
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
