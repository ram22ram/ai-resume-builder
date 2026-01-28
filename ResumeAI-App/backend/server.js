require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();

// 1. MANUAL CORS MIDDLEWARE (Sabse upar rakho)
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

  // OPTIONS (Pre-flight) request ko turant 200 OK bhej do
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.set('trust proxy', 1);
app.use(express.json());

// 2. HEALTH CHECK (Matching with Frontend Modal)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 3. SESSION SETUP
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
require('./config/passport')(passport);

connectDB();

// 4. API ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});