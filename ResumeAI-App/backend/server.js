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

// ✅ 2. Google Popup & COOP Headers (Login Fix)
// Ye middleware popup communication ko allow karega
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
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

// ✅ FIX: Sitemap aur Robots ko pehle check karo (React Router se pehle)
// Isse Google Search Console mein "Sitemap is HTML" error khatam ho jayega
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(buildPath, 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(buildPath, 'robots.txt'));
});

// Static files serve karo
app.use(express.static(buildPath));

// ✅ Fallback: Sirf un paths ke liye jo file nahi hain, index.html bhejenge
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Serving Frontend directly from Backend`);
});