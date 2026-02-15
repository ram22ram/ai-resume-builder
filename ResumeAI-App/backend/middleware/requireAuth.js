const requireAuth = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    // Check if user object exists (for some passport configs)
    if (req.user) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
    });
};

module.exports = requireAuth;
