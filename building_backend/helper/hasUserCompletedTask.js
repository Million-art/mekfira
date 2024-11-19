const CompletedTask = require("../models/competedTasks");

const hasUserCompletedTask = async (telegramId, taskId) => {
    if (!telegramId || !taskId) {
        throw new Error('Invalid telegramId or taskId');
    }

    try {
        const completedTask = await CompletedTask.findOne({
            where: {
                telegramId: telegramId,
                taskId: taskId
            }
        });

        if (completedTask) {
            console.log(`User ${telegramId} has completed task ${taskId}.`);
            return { completed: true, taskId };
        }
        
        return { completed: false, taskId };
    } catch (err) {
        console.error('Error checking if user completed task:', err);
        throw err;
    }
};

module.exports = hasUserCompletedTask 
