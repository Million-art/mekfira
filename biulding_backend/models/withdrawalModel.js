// models/withdrawal.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Adjust the path to your database config
const User = require('./userModel'); // Import the User model if you need a relationship

const Withdrawal = sequelize.define('Withdrawal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'rejected'),
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'withdrawals',
  timestamps: true, // Sequelize will manage `createdAt` and `updatedAt`
});

module.exports = Withdrawal;
