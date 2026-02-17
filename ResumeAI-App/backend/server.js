const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
const mongoose = require('mongoose');

const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const resumeRoutes = require('./routes/resumeRoutes.js');
const atsRoutes = require('./routes/atsRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const aiRoutes = require('./routes/aiRoutes.js');

const User = require('./models/User');

dotenv.config();
const app = express();

/* ======================================================
   0. RAZORPAY WEBHOOK (⚠️ JSON PARSER SE PEHLE)
   ====================================================== */
app.post(
  '/api/webhook/razorpay',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (!secret) {
        return res.status(500).send('Webhook secret not configured');
      }

      const shasum = crypto.createHmac('sha256', secret);
      shasum.update(req.body);
      const digest = shasum.digest('hex');

      if (digest !== req.headers['x-razorpay-signature']) {
        return res.status(400).send('Invalid signature');
      }

      const payload = JSON.parse(req.body.toString());

      // ✅ Subscription charged → PREMIUM ON
      if (payload.event === 'subscription.charged') {
        const subId = payload.payload.subscription.entity.id;

        await User.findOneAndUpdate(
          { subscriptionId: subId },
          {
            isPremium: true,
            plan: 'pro',
            subscriptionStatus: 'active',
          }
        );
      }

      // ❌ Subscription cancelled → PREMIUM OFF
      if (payload.event === 'subscription.cancelled') {
        const subId = payload.payload.subscription.entity.id;

        await User.findOneAndUpdate(
          { subscriptionId: subId },
          {
            isPremium: false,
            plan: 'free',
            subscriptionStatus: 'cancelled',
          }
        );
      }

      res.json({ status: 'ok' });
    } catch (err) {
      console.error('Webhook Error:', err.message);
      res.status(500).send('Webhook processing failed');
    }
  }
);

/* ======================================================
   1. CORS MIDDLEWARE (STRICT PRODUCTION)
   ====================================================== */
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://resume-ai.co.in',
    'https://www.resume-ai.co.in'
  ];

  // Allow localhost only in development
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:5173');
    allowedOrigins.push('http://localhost:3000');
  }

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.set('trust proxy', 1);

/* ======================================================
   2. BODY PARSERS (WEBHOOK KE BAAD)
   ====================================================== */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ======================================================
   3. REQUEST TIMEOUT
   ====================================================== */
app.use((req, res, next) => {
  req.setTimeout(120000);
  res.setTimeout(120000);
  next();
});

/* ======================================================
   4. HEALTH CHECK
   ====================================================== */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ResumeAI Backend',
    dbState: mongoose.connection.readyState
  });
});

/* ======================================================
   5. SESSION SETUP (MONGODB STORE)
   ====================================================== */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60, // 14 days
      autoRemove: 'native'
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' required for cross-site cookie if frontend/backend distinct domains, else 'lax'
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

/* ======================================================
   6. PASSPORT INIT
   ====================================================== */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

/* ======================================================
   7. ROUTES
   ====================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ai', aiRoutes);

/* ======================================================
   8. ERROR HANDLER
   ====================================================== */
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

/* ======================================================
   9. 404 HANDLER
   ====================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* ======================================================
   10. START SERVER (DB FIRST)
   ====================================================== */
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });

    server.timeout = 120000;
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
