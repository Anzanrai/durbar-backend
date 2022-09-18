module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Anj@nra1',
  DB: 'durbar',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
