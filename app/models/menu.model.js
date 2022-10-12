const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const dish_types = [
    'Entree and Side',
    'Durbar Special',
    'Main Course',
    'Drinks',
    'Dessert',
  ];
  const categories = ['veg', 'non-veg'];
  const Menu = sequelize.define(
    'menus',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphaNumeric: true,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dish_type: {
        type: Sequelize.STRING,
        values: dish_types,
        validate: {
          customValidator(value) {
            if (dish_types.indexOf(value) === -1) {
              throw new Error('Dish type not recognized.');
            }
          },
        },
      },
      photo: {
        type: DataTypes.STRING,
      },
      category: {
        type: Sequelize.STRING,
        values: categories,
        validate: {
          customValidator(value) {
            if (categories.indexOf(value) === -1) {
              throw new Error('Dish category not recognized.');
            }
          },
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    { timestamps: true }
  );
  Menu.sync();
  return Menu;
};
