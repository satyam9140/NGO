const mongoose = require('mongoose')
const { Schema } = mongoose

const DonationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  // For real NGOs stored in DB use an ObjectId reference.
  ngo: { type: Schema.Types.ObjectId, ref: 'NGO', required: false },
  // For demo seed NGOs (like 'seed1', 'seed2'), store the seed id and name.
  ngoSeedId: { type: String, required: false },
  ngoName: { type: String, required: false },

  amount: { type: Number, required: true },
  method: { type: String, enum: ['stripe', 'razorpay', 'manual'], default: 'manual' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
})

// Optional: add an index for ngoSeedId if you expect queries on it during demo flows
DonationSchema.index({ ngoSeedId: 1 })

module.exports = mongoose.model('Donation', DonationSchema)