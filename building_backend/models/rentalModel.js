const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Admin = require('./Admin');

const Rental = sequelize.define('Rental', {
  officeId: {
    type: DataTypes.UUID, // Match the type with Office's primary key
    allowNull: false,
    references: {
      model: 'offices',  // Ensure this matches the table name (lowercase if needed)
      key: 'officeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', 
  },

  floorNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  officeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tenantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rentalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tenantEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'admins',  // Ensure this is lowercase as per your table name
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  
}, {
  tableName: 'rentals',
  timestamps: true,
}
);

module.exports = Rental;
