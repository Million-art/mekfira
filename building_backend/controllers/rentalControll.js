const Rental = require('../models/rentalModel');
const sendNotificationEmail = require('../services/nodemailerService');
const { Op } = require('sequelize');
const Office = require('../models/officeModel'); // Office model for reference

// Controller to add a rental
const addRental = async (req, res, next) => {
  const { renterName, renterPhone, rentedOfficeId, adminId } = req.body;

  try {
    // Check if the office and admin exist
    const office = await Office.findByPk(rentedOfficeId);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }

    // Create a new rental record
    const rental = await Rental.create({
      renterName,
      renterPhone,
      rentedOfficeId,
      adminId,
    });

    res.status(201).json(rental);
  } catch (error) {
    next(error);
  }
};

// Controller to get all rentals
const getRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.findAll({
      include: [
        {
          model: Office,
          as: 'rentedOffice', // The alias for Office model association
        },
      ],
    });
    res.status(200).json(rentals);
  } catch (error) {
    next(error);
  }
};

// Controller to get a rental by ID
const getRentalById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rental = await Rental.findByPk(id, {
      include: [
        {
          model: Office,
          as: 'rentedOffice', // Include office information
        },
      ],
    });
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json(rental);
  } catch (error) {
    next(error);
  }
};

// Controller to update a rental
const updateRental = async (req, res, next) => {
  const { id } = req.params;
  const rentalData = req.body;

  try {
    const [updated] = await Rental.update(rentalData, { where: { renterId: id } });

    if (updated) {
      const updatedRental = await Rental.findByPk(id);
      return res.status(200).json(updatedRental);
    } else {
      return res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller to delete a rental
const deleteRental = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Rental.destroy({ where: { renterId: id } });

    if (deleted) {
      return res.status(204).json({ message: 'Rental deleted' });
    } else {
      return res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller to notify tenants about rentals ending soon
const notifyRentalsEndingSoon = async (req, res, next) => {
  try {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 3); // 3 days from now

    // Fetch rentals ending within the next 3 days
    const rentals = await Rental.findAll({
      where: {
        endDate: {
          [Op.lte]: endOfWeek,
        },
      },
      include: [
        {
          model: Office,
          as: 'rentedOffice', // Include office information
        },
      ],
    });

    if (rentals.length > 0) {
      for (const rental of rentals) {
        try {
          // Send the notification email for each rental ending soon
          await sendNotificationEmail(rental.renterEmail, rental.rentedOffice.officeName, rental.endDate);
        } catch (emailError) {
          console.error(`Failed to send email to tenant for rental ${rental.renterId}:`, emailError);
          // Optional: log specific error for email failure if needed
        }
      }
      return res.status(200).json({ message: 'Notifications sent for rentals ending soon.' });
    } else {
      return res.status(200).json({ message: 'No rentals ending soon.' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRental,
  getRentals,
  getRentalById,
  updateRental,
  deleteRental,
  notifyRentalsEndingSoon,
};
