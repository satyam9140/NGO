// require('dotenv').config()
// const app = require('./app')
// const { connectDB } = require('./config/db')
// const PORT = process.env.PORT || 5000

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })
// }).catch(err => {
//   console.error('DB connection failed', err)
// })
// server.js - entry point
require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Connect to DB first (makes startup deterministic)
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB error');
    // Optional: process.exit(1) if you don't want the process running without DB
    process.exit(1);
  }
})();