require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();

// 1. CORS Configuration
app.use(cors({
  origin: [
    'https://resume-ai.co.in', 
    'https://www.resume-ai.co.in',
    'https://resume-ai.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// 2. Handle Preflight OPTIONS (Zaroori hai ERR_NETWORK fix karne ke liye)
app.options('*', cors()); 

app.set('trust proxy', 1);
app.use(express.json());

// 3. Health Check (Sabse upar taaki connectivity turant confirm ho)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'resumeai-backend-v2'
  });
});

// 4. Session & Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
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

// 5. Database & Routes
connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});