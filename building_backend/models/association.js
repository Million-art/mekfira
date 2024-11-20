const Admin = require("./adminModel");
const Rental = require("./rentalModel");
const Office = require("./officeModel");

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

    // One Office can be rented by one Rental (Tenant) at a time
    Rental.belongsTo(Office, {
        foreignKey: 'rentedOfficeId', // Foreign key in Rental pointing to Office
        as: 'office',                 // Alias for office rented by the tenant
    });

    Office.hasOne(Rental, {
        foreignKey: 'rentedOfficeId', // Foreign key in Office pointing to Rental
        as: 'rental',                  // Alias for rental associated with the office
    });
};

module.exports = setupAssociations;
