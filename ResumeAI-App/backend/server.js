require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

app.use(express.json());

// ✅ 1. Allow CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ 1.5 FIX: Google Popup & COOP Headers (YE NAYA HAI)
// Ye middleware browser ko batayega ki Google Popup allowed hai
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ✅ 2. Database Connect
connectDB();

// ✅ 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ==========================================
// 👇👇 FRONTEND SERVING MAGIC 👇👇
// ==========================================

const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Serving Frontend directly from Backend`);
});