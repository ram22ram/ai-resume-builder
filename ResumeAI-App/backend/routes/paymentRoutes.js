const express = require('express');
const razorpay = require('../utils/razorpay');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

/**
 * CREATE SUBSCRIPTION
 */
router.post('/create-subscription', protect, async (req, res) => {
    try {
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 120,
        });

        await User.findByIdAndUpdate(req.user.id, {
            subscriptionId: subscription.id,
            subscriptionStatus: 'created',
        });

        res.json({
            success: true,
            subscriptionId: subscription.id,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error('Subscription Error:', err);
        res.status(500).json({ success: false });
    }
});

/**
 * CANCEL SUBSCRIPTION
 */
router.post('/cancel-subscription', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user?.subscriptionId) return res.json({ success: true });

        await razorpay.subscriptions.cancel(user.subscriptionId);

        user.isPremium = false;
        user.plan = 'free';
        user.subscriptionStatus = 'cancelled';
        await user.save();

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;
