const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const resumeRoutes = require('./routes/resumeRoutes.js');

dotenv.config();
const app = express();

// ========== 1. CORS MIDDLEWARE ==========
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://resume-ai.co.in', 
    'https://www.resume-ai.co.in',
    'http://localhost:5173'
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.set('trust proxy', 1);

// ========== 2. BODY PARSERS & TIMEOUT MIDDLEWARE ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request timeout middleware (Routes se pehle hona chahiye)
app.use((req, res, next) => {
  req.setTimeout(120000);
  res.setTimeout(120000);
  next();
});

// ========== 3. HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'ResumeAI Backend'
  });
});

// ========== 4. SESSION SETUP ==========
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ========== 5. PASSPORT CONFIG ==========
// Passport instance pass kar diya hai taaki Google Strategy register ho
require('./config/passport.js')(passport);

// ========== 6. DATABASE CONNECT ==========
connectDB();

// ========== 7. ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ========== 8. ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// ========== 9. 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ========== 10. START SERVER ==========
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

// ========== 11. SERVER TIMEOUT (Server define hone ke BAAD) ==========
// Isey 'server' variable create hone ke baad hi likh sakte hain
server.timeout = 120000; 

module.exports = app;