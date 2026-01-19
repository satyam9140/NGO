const mongoose = require('mongoose')

const NGOSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mission: String,
  description: String,
  contactEmail: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  attachments: [String] // filenames/URLs if uploaded
})

module.exports = mongoose.model('NGO', NGOSchema)