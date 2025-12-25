require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

app.use(cors({
  origin: ["https://resume-ai.co.in", "http://localhost:5173", "https://localhost:5173", "https://resume-ai.netlify.app"],
}));

app.set('trust proxy', 1);
app.use(express.json());

// ✅ 1. Allow CORS (Production ready)
app.use(cors({
  origin: ["https://resume-ai.co.in", "http://localhost:5173", "https://localhost:5173", "https://resume-ai.netlify.app"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.use(cors({
//   origin: ["https://resume-ai.co.in", "http://localhost:5173"], 
//   credentials: true
// }));

// ✅ 2. Google Popup & COOP Headers (CRITICAL FOR LOGIN)
app.use((req, res, next) => {
  // Iske bina window.postMessage block ho jayega
  req.setTimeout(60000); // 60 seconds
    res.setTimeout(60000);
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none"); 
  next();
});

// ✅ 3. Database Connect
connectDB();

// ✅ 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ==========================================
// 👇👇 FRONTEND SERVING MAGIC (FIXED ORDER) 👇👇
// ==========================================

const buildPath = path.join(__dirname, '../frontend/dist');

// ✅ FIX: Sitemap/Robots check before React Wildcard
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(buildPath, 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(buildPath, 'robots.txt'));
});

app.get('/api/health', (req, res) => res.status(200).send('OK'));
// Static files (JS, CSS, Images) serve karo
// app.use(express.static(buildPath));

// ✅ Fallback: React Router handle karega baaki sab
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// ==========================================

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on https://localhost:${PORT}`);
  console.log(`🌍 Serving Frontend directly from Backend`);
});