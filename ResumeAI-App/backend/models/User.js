const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  googleId: String,
  avatar: String,

  // 🔥 PREMIUM FIELDS
  isPremium: { type: Boolean, default: false },
  plan: { type: String, default: 'free' }, // free | pro
  subscriptionId: String,
  subscriptionStatus: String, // active | cancelled

  // 🔐 AUTH TRACKING (used by passport strategies)
  isLoggedIn: { type: Boolean, default: false },
  lastLogin: Date,

  // 🪄 MAGIC LINK AUTH
  magicToken: { type: String, index: true, sparse: true }, // indexed for fast lookup
  magicTokenExpires: Date,

  // 🔗 LINKEDIN OAUTH (future integration)
  linkedinId: String,
  linkedinProfile: Object, // raw LinkedIn profile data

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
