const NGO = require('../models/NGO.model')
const AuditLog = require('../models/AuditLog.model')

exports.approveNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id)
    if (!ngo) return res.status(404).json({ message: 'NGO not found' })
    ngo.approved = true
    await ngo.save()
    await AuditLog.create({ action: 'approve_ngo', actor: req.userId, details: { ngo: ngo._id } })
    res.json({ message: 'approved' })
  } catch (err) { next(err) }
}