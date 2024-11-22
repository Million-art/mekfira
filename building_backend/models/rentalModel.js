    const { DataTypes } = require('sequelize');
    const sequelize = require('../database/connection');
    const Office = require('./officeModel'); // Ensure Office model is imported

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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        rentedOfficeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'offices',
                key: 'officeId',
            },
            onDelete: 'CASCADE', // Optional: specify the action on delete
        },
        rentalStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rentalEndDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'rentals',
        timestamps: true,
    });

    module.exports = Rental;
