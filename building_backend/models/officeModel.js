const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Admin = require('./adminModel') 

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
        allowNull: true,
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
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'admins',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    tenantId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'rentals',
            key: 'rentalId',
        },
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'offices',
    timestamps: true,
});

module.exports = Office;
