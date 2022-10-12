'use strict';
const fs = require('fs');
const crypto = require('crypto');
/** @type {import('sequelize-cli').Migration} */

const menu_data = [
  {
    name: 'Juice',
    description: 'Chilled flavoured juice.',
    price: 4,
    dish_type: 'Drinks',
    category: 'veg',
    photo: 'seeders/images/juice.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lassi (Mango)',
    description: 'Blended lassi made with fresh mango',
    price: 4,
    dish_type: 'Drinks',
    category: 'veg',
    photo: 'seeders/images/mango_lassi.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft Lalmohal served with yogurt, sprinkle of coconut.',
    price: 5,
    dish_type: 'Dessert',
    category: 'veg',
    photo: 'seeders/images/lalmohan.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Ice cream',
    description: 'Double scooped ice-cream with chocolate and caramel topping.',
    price: 5,
    dish_type: 'Dessert',
    category: 'veg',
    photo: 'seeders/images/icecream.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Rasbari',
    description: 'White rasbari with plain yogurt, cranberries and pistachio.',
    price: 5,
    dish_type: 'Dessert',
    category: 'veg',
    photo: 'seeders/images/rasbari.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Diet Coke',
    description: 'Chilled soft drinks',
    price: 3,
    dish_type: 'Drinks',
    category: 'veg',
    photo: 'seeders/images/diet-coke.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    menu_data.forEach((menu_item) => {
      let photo = fs.readFileSync(menu_item.photo);
      let filename = crypto.randomBytes(4).toString('hex');
      let path = `images/menu-items/${filename}`;
      fs.writeFileSync(path, photo);
      menu_item.photo = path;
    });
    await queryInterface.bulkInsert('Menus', menu_data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Menus', null, {});
  },
};
