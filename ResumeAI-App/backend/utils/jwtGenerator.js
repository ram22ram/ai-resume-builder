// backend/utils/jwtGenerator.js
const jwt = require('jsonwebtoken'); // ✅ YE LINE MISSING HAI

const generateJWTToken = (user) => {
  console.log('🔑 Generating JWT for user:', user.email);
  
  // Check if JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    console.error('❌ CRITICAL: JWT_SECRET environment variable is not set');
    console.error('❌ Check Render Environment Variables for JWT_SECRET');
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  const token = jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar || ''
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  console.log('✅ Token generated successfully (first 20 chars):', token.substring(0, 20) + '...');
  return token;
};

module.exports = generateJWTToken;