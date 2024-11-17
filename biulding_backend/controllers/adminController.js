const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { validationResult } = require('express-validator');

const adminController = {
    // Fetch all admins
    getAllAdmins: async (req, res, next) => {
        try {
            const admins = await Admin.findAll();
            res.json(admins);
        } catch (err) {
            next(err);
        }
    },

    // Get an admin by ID
    getAdminById: async (req, res, next) => {
        const { id } = req.params;
        try {
            const admin = await Admin.findByPk(id);
            if (admin) {
                res.json(admin);
            } else {
                res.status(404).send('Admin not found');
            }
        } catch (err) {
            next(err);
        }
    },

    // Delete an admin
    deleteAdmin: async (req, res, next) => {
        const { id } = req.params;
        try {
            const deleted = await Admin.destroy({
                where: { id }
            });
            if (deleted) {
                res.status(204).send('Admin deleted successfully');
            } else {
                res.status(404).send('Admin not found');
            }
        } catch (err) {
            next(err);
        }
    },

    // Add a new admin
    addAdmin: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { password, ...adminData } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await Admin.create({
                ...adminData,
                password: hashedPassword,
            });

            res.status(201).json({ adminId: newAdmin.id });
        } catch (err) {
            next(err);
        }
    },

    // Login admin and issue tokens
    loginAdmin: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const admin = await Admin.findOne({ where: { email } });
            if (!admin) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate tokens
            const accessToken = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // Store refresh token in the database
            admin.refreshToken = refreshToken;
            await admin.save();

            // Set tokens in HttpOnly cookies
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

            res.status(200).json({ data: admin, message: 'Login successful' });

        } catch (err) {
            next(err);
        }
    },

    // Refresh access token
    refreshToken: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        try {
            const admin = await Admin.findOne({ where: { refreshToken } });
            if (!admin) return res.sendStatus(403);

            jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.sendStatus(403);

                const newAccessToken = jwt.sign(
                    { id: admin.id, email: admin.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '15m' }
                );

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict'
                });

                return res.status(200).json({ message: 'Access token refreshed' });
            });
        } catch (err) {
            next(err);
        }
    },

    logoutAdmin: async (req, res, next) => {
        // Clear cookies for access and refresh tokens
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        // Send a success response
        return res.sendStatus(204);
    }



};

module.exports = adminController;
