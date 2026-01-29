import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

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

// ========== 2. BODY PARSERS ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
import './config/passport.js';

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
app.use('*', (req, res) => {
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

// ========== 11. TIMEOUT SETTINGS ==========
server.timeout = 120000; // 2 minutes
app.use((req, res, next) => {
  req.setTimeout(120000);
  res.setTimeout(120000);
  next();
});

export default app;