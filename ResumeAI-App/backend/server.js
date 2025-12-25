require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

// ✅ Configs aur Routes import karo
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// ✅ Passport Strategy Initialize (Video 1 logic)
require('./config/passport')(passport);

const app = express();

// ✅ 1. CORS Setup (Netlify aur Localhost allowed)
app.use(cors({
  origin: ["https://resume-ai.co.in", "https://www.resume-ai.co.in", "https://resume-ai.netlify.app"],
  credentials: true 
}));

app.set('trust proxy', 1);
app.use(express.json());

// ✅ 2. Session Setup (Passport Google Auth ke liye compulsory hai)
app.use(session({
  secret: process.env.SESSION_SECRET || 'resume_ai_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Production mein true rakhein
    sameSite: 'lax'
  }
}));

// ✅ 3. Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ 4. Security Headers (COOP Fix)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none"); 
  next();
});

// ✅ 5. Database Connect
connectDB();

// ✅ 6. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ==========================================
// 👇👇 FRONTEND SERVING MAGIC 👇👇
// ==========================================

const buildPath = path.join(__dirname, '../frontend/dist');

app.get('/api/health', (req, res) => res.status(200).send('OK'));

// Static files (JS, CSS, Images) serve karo
app.use(express.static(buildPath));

// Fallback: React Router handle karega baaki sab (e.g., /auth-success)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Frontend and Backend linked via Passport Redirect Mode`);
});