const { DataTypes } = require('sequelize');
const { User } = require('./user.model');

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderType: {
        type: DataTypes.STRING,
        values: ['Dine In', 'Take Away'],
        validate: {
          customValidator(value) {
            if (['Dine In', 'Take Away'].indexOf(value) === -1) {
              throw new Error('Invalid order type.');
            }
          },
        },
      },
      tableNumber: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true }
  );
  Order.sync();
  return Order;
};
