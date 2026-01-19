const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in environment (check .env)');
  }

  try {
    // Do NOT pass `useNewUrlParser` or `useUnifiedTopology` here — Mongoose 6+ uses them by default.
    // You can optionally pass other supported options here (timeouts, family, etc).
    await mongoose.connect(uri, {
      // Example optional settings:
      // serverSelectionTimeoutMS: 5000,
      // socketTimeoutMS: 45000,
      // family: 4
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection failed', err);
    // Re-throw or exit depending on how you want to handle it
    throw err;
  }
}

module.exports = connectDB;