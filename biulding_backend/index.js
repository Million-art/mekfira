const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const officeRoutes = require('./routes/officeRoute');  // Import officeRoutes
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./database/connection');
const setupAssociations = require('./models/association');
const morgan = require('morgan');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const port = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies (for form submissions)
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,  // Allow credentials (cookies)
}));

app.use(express.json());  // Parse JSON bodies (for API requests)

app.use(cookieParser());  // Middleware for parsing cookies
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));  // Logger middleware

// Routes
app.use('/api/users/', userRoutes);  // User routes
app.use('/api/offices/', officeRoutes);  // Office routes (fixed)
app.use('/api/admin/', adminRoutes);  // Admin routes

// Error handler middleware
app.use(errorHandler);

// Setup associations (assumes your Sequelize models are set up for relationships)
setupAssociations();

// Database connection and sync (ensure the database schema is correct)
sequelize.sync({ alter: false })  // Use `alter: true` for development, `false` in production
  .then(() => logger.info('Database connected and models synchronized.'))
  .catch(err => logger.error('Error connecting to the database:', { message: err.message, stack: err.stack }));

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Global error handling (unhandled promise rejections, uncaught exceptions)
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { reason, promise });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception thrown:', { message: err.message, stack: err.stack });
  process.exit(1);  // Exit the process on unhandled errors
});
