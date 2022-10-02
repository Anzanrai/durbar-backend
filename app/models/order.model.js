const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Order.sync();
  return Order;
};
