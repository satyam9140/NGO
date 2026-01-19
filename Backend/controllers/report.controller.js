exports.monthly = async (req, res) => {
  // Example: return counts
  const Donation = require('../models/Donation.model')
  const total = await Donation.countDocuments()
  const completed = await Donation.countDocuments({ status: 'completed' })
  res.json({ total, completed })
}