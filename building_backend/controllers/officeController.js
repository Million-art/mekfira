const { validationResult } = require('express-validator');
const Office = require('../models/officeModel');  // Assuming Office is the model for office data
const sequelize = require('../database/connection'); // Assuming you're using Sequelize connection
const Admin = require('../models/adminModel');

const officeController = {
    // Get all available offices (offices that are not rented or under maintenance)
    getAllOffices: async (req, res, next) => {
        try {
            const offices = await Office.findAll();
            res.json(offices);
        } catch (err) {
            next(err);
        }
    },

    // Get all rented offices
    getAllRentedOffices: async (req, res, next) => {
        try {
            const rentedOffices = await Office.findAll({ where: { status: 'Rented' } });
            res.json(rentedOffices);
        } catch (err) {
            next(err);
        }
    },

    // Get all offices that are not rented (i.e., available or under maintenance)
    getNotRentedOffices: async (req, res, next) => {
        try {
            const offices = await Office.findAll({
                where: {
                    status: {
                        [sequelize.Op.ne]: 'Rented', // Using Sequelize 'Op.ne' to exclude 'Rented' status
                    }
                }
            });
            res.json(offices);
        } catch (err) {
            next(err);
        }
    },

    // Get office by ID
    getOfficeById: async (req, res, next) => {
        const { id } = req.params;
        try {
            const officeData = await Office.findByPk(id);
            if (officeData) {
                res.json(officeData);
            } else {
                res.status(404).send('Office not found');
            }
        } catch (err) {
            next(err);
        }
    },

    // Add a new office
    addOffice: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const { officeNo, price, area, floorNo, status } = req.body;
            const adminId = req.user.adminId;
    
            // Validate if adminId exists in the Admin table
            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
    
            // Check if an office with the same officeNo already exists
            const existingOffice = await Office.findOne({ where: { officeNo } });
            if (existingOffice) {
                return res.status(400).json({ message: 'Office already added' });
            }
    
            // Create new Office if not already existing
            const newOffice = await Office.create({
                officeNo,
                price,
                area,
                floorNo,
                status,
                adminId, // Ensure adminId is provided here
            });
    
            res.status(201).json({ message: 'Office created successfully', office: newOffice });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create office', error: error.message });
        }
    },    

    // Update an office
    updateOffice: async (req, res, next) => {
        const { id } = req.params;
        const officeData = req.body;

        try {
            const [updated] = await Office.update(officeData, {
                where: { officeId: id }
            });

            if (updated) {
                res.status(200).send('Office updated successfully');
            } else {
                res.status(404).send('Office not found');
            }
        } catch (err) {
            next(err);
        }
    },

    // Delete an office
    deleteOffice: async (req, res, next) => {
        const { id } = req.params;
        try {
            const deleted = await Office.destroy({
                where: { officeId: id }
            });

            if (deleted) {
                res.status(204).send('Office deleted successfully');
            } else {
                res.status(404).send('Office not found');
            }
        } catch (err) {
            next(err);
        }
    },

    // Rent an office (update status to 'Rented')
    rentOffice: async (req, res, next) => {
        const { officeId } = req.params;

        try {
            const office = await Office.findByPk(officeId);
            if (!office) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Office not found',
                    data: null,
                });
            }

            // Check if the office is already rented
            if (office.status === 'Rented') {
                return res.status(400).json({
                    status: 'error',
                    message: 'This office is already rented',
                    data: null,
                });
            }

            // Update the office status to 'Rented'
            await office.update({ status: 'Rented' });

            res.status(200).json({
                status: 'success',
                message: 'Office rented successfully',
                data: office,
            });
        } catch (err) {
            console.error('Error renting office:', err);
            res.status(500).json({
                status: 'error',
                message: 'An unexpected error occurred. Please try again later.',
                data: null,
            });
        }
    },
};

module.exports = officeController;
