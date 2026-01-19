const mongoose = require('mongoose')
const Donation = require('../models/Donation.model')
const Transaction = require('../models/Transaction.model')
const { stripe, razorpay } = require('../config/payment.config')
const { v4: uuidv4 } = require('uuid')
const demoSeed = require('../config/demoSeed')


exports.create = async (req, res, next) => {
  try {
    const { ngoId, amount, method } = req.body
    const donation = await Donation.create({ user: req.userId, ngo: ngoId, amount, method, status: 'pending' })

    if (method === 'stripe') {
      // Create a payment intent (simple example)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'inr',
        metadata: { donationId: donation._id.toString() }
      })
      res.json({ donationId: donation._id, clientSecret: paymentIntent.client_secret, paymentUrl: null })
    } else if (method === 'razorpay') {
      const options = {
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `donation_${uuidv4()}`,
        notes: { donationId: donation._id.toString() }
      }
      const order = await razorpay.orders.create(options)
      res.json({ donationId: donation._id, order })
    } else {
      res.json({ donationId: donation._id })
    }
  } catch (err) { next(err) }
}
exports.createDonation = async (req, res) => {
  try {
    const { amount, ngo } = req.body;

    // Validate NGO ID
    if (!ngo || !mongoose.Types.ObjectId.isValid(ngo)) {
      return res.status(400).json({
        success: false,
        message: "Valid NGO ID is required"
      });
    }

    const donation = await Donation.create({
      amount,
      ngo
    });

    res.status(201).json({
      success: true,
      donation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.history = async (req, res, next) => {
  try {
    const donations = await Donation.find({ user: req.userId }).populate('ngo')
    res.json(donations.map(d => ({ ...d.toObject(), ngoName: d.ngo?.name })))
  } catch (err) { next(err) }
}

exports.receipt = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('ngo')
    if (!donation) return res.status(404).json({ message: 'Not found' })
    res.json({ _id: donation._id, amount: donation.amount, ngoName: donation.ngo?.name, createdAt: donation.createdAt })
  } catch (err) { next(err) }
}
exports.create = async (req, res, next) => {
  try {
    let { ngoId, amount, method } = req.body
    amount = Number(amount) || 0
    method = method || 'manual'

    // Build donation payload
    const donationPayload = {
      amount,
      method,
      status: 'pending',
      user: req.userId || undefined
    }

    // Attach NGO reference: ObjectId if valid, otherwise fallback to demo seed
    if (ngoId) {
      if (mongoose.Types.ObjectId.isValid(ngoId)) {
        donationPayload.ngo = ngoId
      } else {
        // assume demo seed or external string; store it in ngoSeedId and try to capture a name
        donationPayload.ngoSeedId = String(ngoId)
        const seed = demoSeed.find(s => s._id === ngoId)
        donationPayload.ngoName = seed ? seed.name : String(ngoId)
      }
    }

    const donation = await Donation.create(donationPayload)

    // If payment integrations are configured, create provider-specific objects.
    // Keep simple: return client details to frontend (clientSecret / order) when needed.

    if (method === 'stripe' && stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'inr',
        metadata: { donationId: donation._id.toString() }
      })
      return res.json({ donationId: donation._id, clientSecret: paymentIntent.client_secret, paymentUrl: null })
    } else if (method === 'razorpay' && razorpay) {
      const options = {
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `donation_${uuidv4()}`,
        notes: { donationId: donation._id.toString() }
      }
      const order = await razorpay.orders.create(options)
      return res.json({ donationId: donation._id, order })
    } else {
      // manual/dummy flows — return donation created
      return res.json({ donationId: donation._id })
    }
  } catch (err) {
    next(err)
  }
}
