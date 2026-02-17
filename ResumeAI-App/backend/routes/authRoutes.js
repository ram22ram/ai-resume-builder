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

// 🪄 MAGIC LINK ROUTES
const crypto = require('crypto');
const User = require('../models/User');

// 1. Send Magic Link
router.post('/magic-login', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let user = await User.findOne({ email });
    if (!user) {
      // Create new user if not exists
      user = await User.create({ email, name: email.split('@')[0], plan: 'free' });
    }

    // Generate Token
    const magicToken = crypto.randomBytes(32).toString('hex');
    user.magicToken = magicToken;
    user.magicTokenExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // Link (Points to Backend Callback)
    const link = `${process.env.BACKEND_URL || 'https://resume-ai.co.in'}/api/auth/magic-callback?email=${encodeURIComponent(email)}&token=${magicToken}`;

    // 📧 TODO: Integrate Nodemailer here. For now, LOG IT.
    console.log(`🪄 MAGIC LINK FOR ${email}: ${link}`);

    res.json({ success: true, message: 'Magic link sent! Check server logs.' });
  } catch (error) {
    console.error('Magic Login Error:', error);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
});

// 2. Verify Magic Link
router.get('/magic-callback', async (req, res) => {
  try {
    const { email, token } = req.query;

    const user = await User.findOne({
      email,
      magicToken: token,
      magicTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect('https://resume-ai.co.in/login?error=invalid_magic_link');
    }

    // Clear Token
    user.magicToken = undefined;
    user.magicTokenExpires = undefined;
    await user.save();

    // Generate JWT
    const jwtToken = generateJWTToken(user);
    const userParam = encodeURIComponent(JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email
    }));

    // Redirect to Auth Success
    res.redirect(`https://resume-ai.co.in/auth-success?token=${jwtToken}&user=${userParam}`);

  } catch (error) {
    console.error('Magic Callback Error:', error);
    res.redirect('https://resume-ai.co.in/login?error=magic_link_failed');
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('https://resume-ai.co.in');
  });
});

module.exports = router;