const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ensure the path is correct

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure emails are unique
        validate: {
            isEmail: true, // Validate that the email is in the correct format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'admins', // Specify a table name for clarity
    timestamps: true, // Sequelize will automatically manage createdAt and updatedAt
});



module.exports = Admin;
