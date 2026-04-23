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
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=auth_failed`,
    session: false
  }),
  (req, res) => {
    try {
      const token = generateJWTToken(req.user);

      // ✅ FIX: Include isPremium + picture so premium gating works immediately after login
      const userParam = encodeURIComponent(JSON.stringify({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.avatar || '',
        isPremium: req.user.isPremium || false,
      }));

      const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
      res.redirect(`${CLIENT_URL}/auth-success?token=${token}&user=${userParam}`);
    } catch (error) {
      console.error('Callback Error:', error.message);
      const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
      res.redirect(`${CLIENT_URL}/login?error=token_generation_failed`);
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

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name: email.split('@')[0], plan: 'free' });
    }

    // Generate secure token
    const magicToken = crypto.randomBytes(32).toString('hex');
    user.magicToken = magicToken;
    user.magicTokenExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';
    const link = `${BACKEND_URL}/api/auth/magic-callback?email=${encodeURIComponent(email)}&token=${magicToken}`;

    // Send real email via Resend (falls back to console in dev if key missing)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const { Resend } = require('resend');
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: 'ResumeAI <noreply@resume-ai.co.in>',
        to: email,
        subject: '🔗 Your ResumeAI Login Link',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; background: #020617; color: white; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800;">Resume<span style="color: #ddd6fe;">AI</span></h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Your career intelligence platform</p>
            </div>
            <div style="padding: 32px;">
              <h2 style="margin: 0 0 16px; font-size: 22px;">Your magic login link 🪄</h2>
              <p style="color: #94a3b8; margin: 0 0 28px; line-height: 1.6;">
                Click the button below to instantly login to ResumeAI. This link expires in <strong style="color: white;">10 minutes</strong> and can only be used once.
              </p>
              <a href="${link}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Login to ResumeAI →
              </a>
              <p style="color: #475569; font-size: 12px; margin: 24px 0 0; line-height: 1.5;">
                If you didn't request this, you can safely ignore this email. Your account is secure.
              </p>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="color: #475569; font-size: 11px; margin: 0;">© 2025 ResumeAI · resume-ai.co.in</p>
            </div>
          </div>
        `,
      });
      res.json({ success: true, message: 'Magic link sent! Check your email.' });
    } else {
      // Dev fallback: log to console
      console.log(`🪄 [DEV] MAGIC LINK FOR ${email}: ${link}`);
      res.json({ success: true, message: '[DEV] Magic link logged to server console (RESEND_API_KEY not set).' });
    }
  } catch (error) {
    console.error('Magic Login Error:', error);
    res.status(500).json({ error: 'Failed to send magic link. Please try again.' });
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
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.avatar || '',
      isPremium: user.isPremium || false,
    }));

    const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${CLIENT_URL}/auth-success?token=${jwtToken}&user=${userParam}`);

  } catch (error) {
    console.error('Magic Callback Error:', error);
    const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${CLIENT_URL}/login?error=magic_link_failed`);
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('https://resume-ai.co.in');
  });
});

module.exports = router;