const Admin = require("./Admin");    // Admin model
const Rental = require("./rentalModel");  // Rental model
const Office = require("./officeModel");  // Office model

const setupAssociations = () => {
    // One Rental can have many Offices
    Rental.hasMany(Office, {
        foreignKey: 'rentalId',   // Foreign key in Office referencing Rental
        as: 'office',            // Alias to use when including Offices in Rental
    });

    // Each Office belongs to one Rental
    Office.belongsTo(Rental, {
        foreignKey: 'rentalId',
        as: 'rental',
        onDelete: 'CASCADE', // Automatically delete related rows in offices
    });
    
    // Each Rental s associated with one Admin (assuming Admin manages Rentals)
    Rental.belongsTo(Admin, {
        foreignKey: 'adminId',    // Foreign key in Rental referencing Admin
        as: 'admin',              // Alias to use when including Admin in Rental
    });

    // Each Admin can have many Rentals they manage
    Admin.hasMany(Rental, {
        foreignKey: 'adminId',    // Foreign key in Rental referencing Admin
        as: 'managedRentals',     // Alias to use when including Rentals in Admin
    });
};

module.exports = setupAssociations;
