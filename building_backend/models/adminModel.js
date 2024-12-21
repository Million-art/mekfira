const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('superAdmin', 'admin'),
        allowNull: false,
        defaultValue: 'admin',
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,  // Token is optional initially
    },
    resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,  // Expiry is optional initially
    },
}, {
    tableName: 'admins',
    timestamps: true,
});

module.exports = Admin;
