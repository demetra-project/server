const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 3306,
    dialectOptions: { connectTimeout: 60000 },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

module.exports = {
  sequelize,
  Sequelize
};
