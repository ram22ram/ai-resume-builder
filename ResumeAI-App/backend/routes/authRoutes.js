const express = require('express');
const passport = require('passport');
// 🔥 FIX: Standard import (bina braces ke agar module.exports use kiya hai)
const generateJWTToken = require('../utils/jwtGenerator');

const router = express.Router();

// Google Auth Route
router.get('/google', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })(req, res, next);
});

// Google Callback Route
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://resume-ai.co.in/login?error=auth_failed',
    session: false
  }),
  (req, res) => {
    try {
      // ✅ Token Generation Fix
      const token = generateJWTToken(req.user);

      const userParam = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }));

      // Redirecting to builder or auth-success page
      res.redirect(`https://resume-ai.co.in/auth-success?token=${token}&user=${userParam}`);
    } catch (error) {
      console.error('Callback Error:', error.message);
      res.redirect('https://resume-ai.co.in/login?error=token_generation_failed');
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('https://resume-ai.co.in');
  });
});

module.exports = router;