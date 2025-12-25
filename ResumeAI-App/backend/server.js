// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();

// ✅ CORS Setup (Netlify aur Domain ke liye)
app.use(cors({
  origin: [
    'https://resume-ai.co.in', 
    'https://www.resume-ai.co.in',
    'https://resume-ai.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.set('trust proxy', 1);
app.use(express.json());

// ✅ Session Setup (Passport ke liye must hai)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// ✅ Passport Setup
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ✅ Database Connection
connectDB();

// ✅ API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

// ✅ Health Check Route (Render cold start ke liye important)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'resumeai-backend-v2',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ✅ Google OAuth Route - Cold Start Protection
app.get('/api/auth/google', (req, res, next) => {
  console.log('Google OAuth requested - Server uptime:', process.uptime());
  
  // Cold start check - agar server abhi start hua hai
  if (process.uptime() < 10) {
    console.log('Cold start detected, waiting 3 seconds for DB...');
    setTimeout(() => {
      passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
      })(req, res, next);
    }, 3000);
  } else {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res, next);
  }
});

// ✅ Frontend files serve NAHI karna kyunki frontend alag hai (Netlify par)
// Sirf API routes serve karna hai

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌍 API: http://localhost:${PORT}/api`);
  console.log(`🔵 Google OAuth: http://localhost:${PORT}/api/auth/google`);
});