const mongoose = require('mongoose')
const Donation = require('../models/Donation.model')
const Transaction = require('../models/Transaction.model')
const { stripe, razorpay } = require('../config/payment.config')
const { v4: uuidv4 } = require('uuid')

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
    // Example request body: { ngo: "<objectId>", amount: 500, donorName: "Alice" }
    let { ngo, amount, donorName } = req.body;

    // 1) Sanitize: convert empty string to undefined
    if (typeof ngo === 'string') ngo = ngo.trim();
    if (!ngo) ngo = undefined;

    // 2) Validate presence and format
    if (!ngo) {
      return res.status(400).json({ error: 'ngo is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(ngo)) {
      return res.status(400).json({ error: 'Invalid ngo id' });
    }

    const donation = new Donation({ ngo, amount, donorName });
    await donation.save();

    res.status(201).json(donation);
  } catch (err) {
    console.error('createDonation error', err);
    res.status(500).json({ error: 'Internal server error' });
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