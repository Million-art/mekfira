const User = require("../models/userModel");

async function rewardReferrer(userId) {
    const user = await User.findByPk(userId);
    if (user && user.referredBy) {
        const referrer = await User.findByPk(user.referredBy);
        referrer.balance += 10; // Reward amount for referral
        await referrer.save();
    }
}
