const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const { validationResult } = require('express-validator');

// Utility to get secure cookie setting based on environment
const getSecureCookieSetting = () => process.env.NODE_ENV === 'production';

// Utility to get SameSite cookie setting based on environment
const getSameSiteSetting = () => process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax';

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

        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        try {
            // Check if an admin with the same email already exists
            const existingAdmin = await Admin.findOne({ where: { email } });
            if (existingAdmin) {
                return res.status(400).json({ message: "Email is already in use" });
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new admin
            const newAdmin = await Admin.create({
                email,
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

            // Generate tokens using different secrets for added security
            const accessToken = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

 
            await admin.save();

            // Get the secure and SameSite cookie settings based on environment
            const secureCookie = getSecureCookieSetting();
            const sameSiteSetting = getSameSiteSetting();

            // Set tokens in HttpOnly cookies
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: secureCookie, sameSite: sameSiteSetting });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: secureCookie, sameSite: sameSiteSetting });

            res.status(200).json({ data: admin, message: 'Login successful' });

        } catch (err) {
            next(err);
        }
    },

  accessTokenGenerator :async (req, res) => {
        const cookies = req.cookies;
      
        try {
          if (!cookies?.jwt) {
            const error = new Error("the cookies token is not found");
            error.statustCode = 400;
            return next(error)
          }
          const refreshtoken = cookies.jwt;
          const decoded = jwt.verify(refreshtoken, process.env.refreshtoken)
          const admin = await Admin.findByPk(decoded.id);
          if (!admin) {
            const admin = await Admin.findByPk(decoded.id);
            if (!admin) {
              return res.status(404).json({ message: "no user found" })
            }
      
          }
          const accesstoken = jwt.sign({id: decoded.id, email: decoded.email,  }, process.env.accessToken, { expiresIn: "1hr" });
          res.status(200).json({ accesstoken, decoded })
      
        }
        catch (error) {
          if (error.name === 'JsonWebTokenError') {
      
            return res.status(403).json({ message: "Invalid refresh token" });
          }
          if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: "Refresh token expired" });
          }
          res.status(500).json({ message: error.message });
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
