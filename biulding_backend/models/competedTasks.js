const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./userModel');  // Import the User model
const Task = require('./taskModel');  // Import the Task model

const CompletedTask = sequelize.define('CompletedTask', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  telegramId: { 
    type: DataTypes.STRING,  
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'id', // The key in the User model
    },
    onDelete: 'CASCADE', // Optional: Delete completed tasks if the user is deleted
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Task, // Reference to the Task model
      key: 'taskId', // The key in the Task model
    },
    onDelete: 'CASCADE', // Optional: Delete completed tasks if the task is deleted
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'completed_tasks', // Specify a table name for clarity
  timestamps: true, // Sequelize will manage createdAt and updatedAt
});


module.exports = CompletedTask;
