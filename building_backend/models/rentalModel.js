const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Rental = sequelize.define('Rental', {
    rentalId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tenantName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'rentals',
    timestamps: true,
});

module.exports = Rental;
