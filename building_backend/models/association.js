const Admin = require("./adminModel");    // Admin model
const Rental = require("./rentalModel");  // Rental (Tenant) model
const Office = require("./officeModel");  // Office model

const setupAssociations = () => {
    // Admin manages multiple offices
    Admin.hasMany(Office, {
        foreignKey: 'adminId',
        as: 'offices',
    });

    Office.belongsTo(Admin, {
        foreignKey: 'adminId',
        as: 'admin',
    });

    // One Rental (Tenant) can occupy many offices
    Rental.hasMany(Office, {
        foreignKey: 'tenantId', // Foreign key in Office pointing to Rental
        as: 'offices',          // Alias for offices rented by the tenant
    });

    Office.belongsTo(Rental, {
        foreignKey: 'tenantId', // Foreign key in Office pointing to Rental
        as: 'tenant',           // Alias for the tenant of the office
    });
};

module.exports = setupAssociations;
