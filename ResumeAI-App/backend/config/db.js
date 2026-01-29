const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Render dashboard ke naam (MONGODB_URI) se match kar diya hai
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;