const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Office = sequelize.define('Office', {
    officeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    officeNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    floorNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Available', 'Rented', 'UnderMaintenance'),
        allowNull: false,
    },
}, {
    tableName: 'offices', // Ensure correct table name (case-sensitive)
    timestamps: true,
});

module.exports = Office;
