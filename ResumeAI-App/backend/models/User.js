const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  googleId: { type: String, required: true }, // Future safety ke liye
  credits: { type: Number, default: 1 }, // 1 Free download credit
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);