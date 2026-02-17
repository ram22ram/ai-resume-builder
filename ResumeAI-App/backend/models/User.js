const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String,
  avatar: String,

  // 🔥 PREMIUM FIELDS
  isPremium: { type: Boolean, default: false },
  plan: { type: String, default: 'free' }, // free | pro
  subscriptionId: String,
  subscriptionStatus: String, // active | cancelled

  // 🪄 MAGIC LINK AUTH
  magicToken: String,
  magicTokenExpires: Date,

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
