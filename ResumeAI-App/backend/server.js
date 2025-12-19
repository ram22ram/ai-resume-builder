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

// ✅ 2. Database Connect
connectDB();

// ✅ 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ==========================================
// 👇👇 FRONTEND SERVING MAGIC 👇👇
// ==========================================

// Frontend Build Folder ka path
const buildPath = path.join(__dirname, '../frontend/dist');

// Static files serve karo
app.use(express.static(buildPath));

// 🚨 YAHAN ERROR THA - AB FIX HAI 🚨
// Pehle: app.get('*', ...)  <-- Ye crash kar raha tha
// Abhi:  app.get(/.*/, ...)  <-- Ye Regex hai, ye kabhi crash nahi karega
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Serving Frontend directly from Backend`);
});