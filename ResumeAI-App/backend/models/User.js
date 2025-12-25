const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String, // ✅ Google unique ID store karne ke liye
  avatar: String,   // ✅ User ki profile picture
  isLoggedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);