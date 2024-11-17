const CompletedTask = require("./competedTasks");
const Task = require("./taskModel");
const User = require("./userModel");

const setupAssociations = () => {
    // Each CompletedTask belongs to one Task
    CompletedTask.belongsTo(Task, {
        foreignKey: 'taskId',    // Foreign key in CompletedTask referencing Task
        as: 'task',              // Alias to use when including Task
    });

    // Each CompletedTask belongs to one User
    CompletedTask.belongsTo(User, {
        foreignKey: 'telegramId', // Foreign key in CompletedTask referencing User
        targetKey: 'telegramId',  // Ensure it matches the telegramId in User model
        as: 'user',               // Alias to use when including User
    });

    // Each Task can have many CompletedTasks
    Task.hasMany(CompletedTask, {
        foreignKey: 'taskId',
        as: 'completedTasks', // Alias to use when including CompletedTasks
    });

    // Each User can have many CompletedTasks
    User.hasMany(CompletedTask, {
        foreignKey: 'telegramId',
        as: 'completedTasks', // Alias to use when including CompletedTasks
    });
};

module.exports = setupAssociations;
