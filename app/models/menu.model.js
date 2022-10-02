const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
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
        values: [
          'Entree and Slide',
          'Durbar Special',
          'Main Course',
          'Drinks',
          'Dessert',
        ],
        validate: {
          customValidator(value) {
            if (
              [
                'Entree and Slide',
                'Durbar Special',
                'Main Course',
                'Drinks',
                'Dessert',
              ].indexOf(value) === -1
            ) {
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
        values: ['veg', 'non-veg'],
        validate: {
          customValidator(value) {
            if (['veg', 'non-veg'].indexOf(value) === -1) {
              throw new Error('Dish category not recognized.');
            }
          },
        },
      },
    },
    { timestamps: true }
  );
  Menu.sync();
  return Menu;
};
