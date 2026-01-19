// const mongoose = require('mongoose')

// const DonationSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
//   amount: { type: Number, required: true },
//   method: { type: String, enum: ['stripe', 'razorpay', 'manual'], default: 'stripe' },
//   status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
//   paymentId: String,
//   createdAt: { type: Date, default: Date.now }
// })

// module.exports = mongoose.model('Donation', DonationSchema)

const mongoose = require('mongoose');
const { Schema } = mongoose;

const donationSchema = new Schema({
  amount: { type: Number, required: true },
  donorName: { type: String, required: false },
  // ngo must be an ObjectId referencing Ngo
  ngo: { type: Schema.Types.ObjectId, ref: 'Ngo', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);