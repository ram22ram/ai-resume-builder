const jwt = require('jsonwebtoken');

/**
 * requireAuth middleware
 * Verifies Bearer JWT from Authorization header.
 * Falls back to Passport session for OAuth flows.
 * Attaches decoded user payload to req.user.
 */
const requireAuth = (req, res, next) => {
    // 1. Try JWT Bearer token (used by frontend API calls)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Session expired. Please login again.',
                    code: 'TOKEN_EXPIRED'
                });
            }
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
                code: 'INVALID_TOKEN'
            });
        }
    }

    // 2. Fallback: Passport session (for server-side OAuth flows)
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        code: 'AUTH_REQUIRED'
    });
};

module.exports = requireAuth;

