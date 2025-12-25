require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // ✅ ADD THIS

// ✅ Configs aur Routes import karo
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// ✅ 0. FIRST - Health Check (Cold Start के लिए)
app.get('/api/health', async (req, res) => {
  try {
    // MongoDB connection check
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    
    res.status(200).json({ 
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbState === 1 ? 'Connected' : 'Disconnected',
      dbState: dbState
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR',
      error: error.message 
    });
  }
});

// ✅ 1. CORS Setup
app.use(cors({
  origin: ["https://resume-ai.co.in", "https://www.resume-ai.co.in", "https://resume-ai.netlify.app"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.set('trust proxy', 1);
app.use(express.json());

// ✅ 2. IMPROVED Session Setup with MongoStore
app.use(session({
  secret: process.env.SESSION_SECRET || 'resume_ai_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// ✅ 3. Passport Middleware (AFTER Session)
app.use(passport.initialize());
app.use(passport.session());

// ✅ 4. Security Headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ✅ 5. Database Connect with RETRY LOGIC
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');
    
    // ✅ Passport Initialize AFTER DB Connection
    require('./config/passport')(passport);
    
    // ✅ API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/resume', resumeRoutes);
    
    // ✅ Frontend Serving
    const buildPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(buildPath));
    
    // Fallback Route
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();