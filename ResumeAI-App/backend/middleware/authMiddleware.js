const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token nikalo ("Bearer eyJhb..." -> "eyJhb...")
      token = req.headers.authorization.split(' ')[1];

      // Verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // User ID request mein jod do
      req.user = decoded; 
      next();
    } catch (error) {
      console.error("Token Failed:", error.message);
      res.status(401).json({ 
        success: false,
        message: 'Not authorized, token failed' 
      });
    }
  }

  if (!token) {
    res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token' 
    });
  }
};

module.exports = { protect };  // ✅ CommonJS export