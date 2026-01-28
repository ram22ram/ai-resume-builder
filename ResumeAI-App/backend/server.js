require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();

// 1. CORS Setup
// app.use(cors({
//   origin: function (origin, callback) {
//     // Ye sabko allow kar dega jo tumne list kiye hain + localhost
//     const allowedOrigins = [
//       'https://resume-ai.co.in', 
//       'https://www.resume-ai.co.in',
//       'https://resume-ai.netlify.app',
//       'http://localhost:5173',
//       'http://localhost:5174'
//     ];
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));
app.use(cors({
  origin: true, // Ye har kisi ko allow kar dega
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
// OPTIONS requests ko specifically handle karo
app.options('*', cors());

app.set('trust proxy', 1);
app.use(express.json());

// 2. Health Check (Iska address ab: /api/health hai)
// Isko routes se upar rakho taaki jaldi detect ho
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// 3. Session Setup
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

// 4. API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});