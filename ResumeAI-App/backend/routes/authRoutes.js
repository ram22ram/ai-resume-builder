const generateJWTToken = require('../utils/jwtGenerator');

const express = require('express');
const passport = require('passport');
const router = express.Router();

// ✅ Google Auth Route with Cold Start Protection
router.get('/google', (req, res, next) => {
  console.log('Google OAuth Initiated - Uptime:', process.uptime());
  
  // Cold start check - agar server abhi start hua hai
  if (process.uptime() < 10) { // First 10 seconds
    console.log('⚠️  Cold start detected, adding 2s delay for DB...');
    setTimeout(() => {
      passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
      })(req, res, next);
    }, 2000);
  } else {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res, next);
  }
});

// ✅ Google Callback Route
router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: 'https://resume-ai.co.in/login?error=auth_failed',
    session: false // ✅ JWT use kar rahe hain to session false rakhein
  }),
  (req, res) => {
    try {
      // ✅ JWT Token Generate (aggar aap JWT use kar rahe hain)
      const token = generateJWTToken(req.user); // Apna JWT function
      
      // ✅ Frontend par redirect with token
      res.redirect(`https://resume-ai.co.in/auth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
    } catch (error) {
      console.error('Callback Error:', error);
      res.redirect('https://resume-ai.co.in/login?error=token_generation_failed');
    }
  }
);

// ✅ Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('https://resume-ai.co.in');
  });
});

module.exports = router;