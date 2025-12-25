const express = require('express');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/google
// Google login trigger
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback handling
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Yahan hum JWT token generate karenge aur frontend par redirect karenge
    const token = generateToken(req.user); 
    const userData = encodeURIComponent(JSON.stringify(req.user));
    
    // ✅ Frontend (Netlify) par wapas bhejo token ke saath
    res.redirect(`https://resume-ai.netlify.app/auth-success?token=${token}&user=${userData}`);
  }
);

module.exports = router;