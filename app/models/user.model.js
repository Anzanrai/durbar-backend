const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      allowBlank: false,
      unique: { arg: true, msg: 'This username is already taken.' },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'User with this email already registered. Try logging in.',
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.sync();
  return User;
};
