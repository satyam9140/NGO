const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
  provider: String,
  providerPaymentId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Transaction', TransactionSchema)