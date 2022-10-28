const bcrypt = require('bcryptjs');

exports.userData = [
  {
    username: 'root',
    email: 'root@durbar.com',
    password: bcrypt.hashSync('admin'),
  },
  {
    username: 'anjan',
    email: 'rai.unknown@gmail.com',
    password: bcrypt.hashSync('Anj@nra1'),
  },
  {
    username: 'pratiksha',
    email: 'pratiksha.danuwar329@gmail.com',
    password: bcrypt.hashSync('pratu4@njan'),
  },
];

exports.menuData = [
  {
    name: 'Samosa (2 pcs)',
    description:
      'Traditional pastries stuffed with potatoes, peas mixed in Nepalese style spices.',
    price: 7,
    dish_type: 'Entree and Side',
    category: 'veg',
    photo: 'seeders/images/samosa.png',
  },
  {
    name: 'Choila',
    description:
      'Chargrilled cubed meat fillets marinated with fresh herbs and toasted in onion, garlic and mustard oil sauteed in the Himalayan sauce.',
    price: 16,
    dish_type: 'Entree and Side',
    category: 'non-veg',
    photo: 'seeders/images/choila.jpeg',
  },
  {
    name: 'Paneer Chilli',
    description:
      'Fried cottage cheese tossed with chilli sauce, tomato, capsicum, onion, and herbs.',
    price: 17,
    dish_type: 'Entree and Side',
    category: 'veg',
    photo: 'seeders/images/paneer_chilli.jpeg',
  },
  {
    name: 'Jhol Momo',
    description:
      'Handmande Nepalese dumpling (10 pcs) served with warm soup. This is a homestyle momo.',
    price: 15,
    dish_type: 'Durbar Special',
    category: 'non-veg',
    photo: 'seeders/images/jhol-momo.png',
  },
  {
    name: 'Steam Momo',
    description:
      'Handmade Nepalese dumpling (10 pcs) served with homemade tomato chutney (pickle).',
    price: 13,
    dish_type: 'Durbar Special',
    category: 'non-veg',
    photo: 'seeders/images/steam_momo.jpeg',
  },
  {
    name: 'Chowmein',
    description: 'Nepalese style fried noodles. A goto Nepalese dish.',
    price: 17,
    dish_type: 'Durbar Special',
    category: 'non-veg',
    photo: 'seeders/images/chowmein.jpeg',
  },
  {
    name: 'Gundruk Bhatmas',
    description:
      'Fermented green leafy vegetables cooked with deep fried soybean in Himalayan style gravy sauce.',
    price: 15,
    dish_type: 'Main Course',
    category: 'veg',
    photo: 'seeders/images/gundruk_bhatmas.jpeg',
  },
  {
    name: 'Aloo Bhanta',
    description:
      'Eggplant and potato curry cooked in Nepalese style spices and sauce.',
    price: 16,
    dish_type: 'Main Course',
    category: 'veg',
    photo: 'seeders/images/aalu_bhanta.jpeg',
  },
  {
    name: 'Aloo Bodi Tama',
    description:
      'Traditional Nepalese curry prepared from pickled bamboo shoots cooked with potatoes and black eyed beans.',
    price: 16,
    dish_type: 'Main Course',
    category: 'veg',
    photo: 'seeders/images/aalu_bodi_taama.jpeg',
  },
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
