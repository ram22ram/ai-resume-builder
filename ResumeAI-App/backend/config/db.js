const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Strict query mode is default in Mongoose 7+, but safe to keep
    mongoose.set('strictQuery', true);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // REMOVE these deprecated options:
      // useNewUrlParser: true,    // ❌ Delete this line
      // useUnifiedTopology: true, // ❌ Delete this line
      
      // Keep these timeout settings:
      serverSelectionTimeoutMS: 30000, // 30 seconds to find a server
      socketTimeoutMS: 45000,          // 45 seconds for socket operations
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Connection events
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Auto-retry after 5 seconds
    console.log('🔄 Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectDB, 5000);
    
    throw error;
  }
};

module.exports = connectDB;