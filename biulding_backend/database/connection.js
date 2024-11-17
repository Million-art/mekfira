
/// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mella', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});


module.exports = sequelize;


// const { Sequelize } = require('sequelize');
// require('dotenv').config();  // Load environment variables from .env file

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// module.exports = sequelize;
