// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');  

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  telegramId: {
    type: DataTypes.STRING,
    unique: true, // Ensure unique telegramId
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true, // Ensure unique username
    allowNull: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0, // Default balance value
  },
  referredBy: {
    type: DataTypes.STRING,
    allowNull: true,
  
  },
  referral_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default referral count value
  
},},
{
  tableName: 'users',
  timestamps: true, // Sequelize will manage `createdAt` and `updatedAt`
});

module.exports = User;
