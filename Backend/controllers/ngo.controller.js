const NGO = require('../models/NGO.model')

exports.list = async (req, res, next) => {
  try {
    const ngos = await NGO.find({ approved: true })
    res.json(ngos)
  } catch (err) { next(err) }
}

exports.get = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id)
    if (!ngo) return res.status(404).json({ message: 'Not found' })
    res.json(ngo)
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { name, mission, description, contactEmail } = req.body
    const attachments = (req.files || []).map(f => f.filename)
    const ngo = await NGO.create({ name, mission, description, contactEmail, attachments, approved: false })
    res.status(201).json(ngo)
  } catch (err) { next(err) }
}