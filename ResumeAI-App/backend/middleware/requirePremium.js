const requirePremium = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (req.user.isPremium) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: 'Premium subscription required',
        code: 'PREMIUM_REQUIRED'
    });
};

module.exports = requirePremium;
