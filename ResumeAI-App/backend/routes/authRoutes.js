const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Google se Token Verify karo
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, picture, sub } = ticket.getPayload();

    // 2. Check karo user DB mein hai ya naya hai
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ 
        name, 
        email, 
        picture, 
        googleId: sub 
      });
      await user.save();
      console.log("🎉 New User Signup:", email);
    }

    // 3. Apna JWT Token banao (Session maintain karne ke liye)
    const sessionToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // 30 din tak login rahega
    );

    res.json({ success: true, token: sessionToken, user });

  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid Google Token" });
  }
});

module.exports = router;