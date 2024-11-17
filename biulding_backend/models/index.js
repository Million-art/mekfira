// models/index.js

const sequelize = require('../database/connection'); // Your Sequelize connection
const User = require('./userModel');
const Task = require('./taskModel');
const CompletedTask = require('./CompletedTask');

// Many-to-Many relationship between User and Task through CompletedTask
User.belongsToMany(Task, { through: CompletedTask });
Task.belongsToMany(User, { through: CompletedTask });

// Export the models and sequelize for use in the rest of your application
module.exports = {
  sequelize,
  User,
  Task,
  CompletedTask,
};
