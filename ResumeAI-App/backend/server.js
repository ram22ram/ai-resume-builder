const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');

const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const resumeRoutes = require('./routes/resumeRoutes.js');
const atsRoutes = require('./routes/atsRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');

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
   1. CORS MIDDLEWARE
   ====================================================== */
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://resume-ai.co.in',
    'https://www.resume-ai.co.in',
    'http://localhost:5173',
  ];

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
  });
});

/* ======================================================
   5. SESSION SETUP
   ====================================================== */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
   7. DATABASE CONNECT
   ====================================================== */
connectDB();

/* ======================================================
   8. ROUTES
   ====================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/payment', paymentRoutes);

/* ======================================================
   9. ERROR HANDLER
   ====================================================== */
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

/* ======================================================
   10. 404 HANDLER
   ====================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* ======================================================
   11. START SERVER
   ====================================================== */
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

server.timeout = 120000;

module.exports = app;
