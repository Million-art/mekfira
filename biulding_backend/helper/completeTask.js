async function completeTask(userId, taskId) {
    const task = await Task.findByPk(taskId);
    const user = await User.findByPk(userId);

    if (!task || !user) {
        throw new Error("Task or User not found");
    }

    if (task.totalBudget >= task.payPerUser) {
        await sequelize.transaction(async (t) => {
            // Deduct from task budget
            task.totalBudget -= task.payPerUser;
            await task.save({ transaction: t });

            // Add to user balance
            user.balance += task.payPerUser;
            await user.save({ transaction: t });

            // Log the task completion
            await TaskCompletion.create({ userId, taskId }, { transaction: t });

            // If the task budget is less than the pay per user, deactivate the task
            if (task.totalBudget < task.payPerUser) {
                task.isActive = false;
                await task.save({ transaction: t });
            }
        });
    } else {
        throw new Error("Insufficient task budget to complete");
    }
}
