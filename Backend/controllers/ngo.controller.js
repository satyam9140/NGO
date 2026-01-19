// const NGO = require('../models/NGO.model')

// // Demo seed data returned when the DB has no approved NGOs.
// // This helps the frontend show sample NGOs during development without seeding the DB.
// const demoSeed = [
//   {
//     _id: 'seed1',
//     name: 'Care for All',
//     mission: 'Provide basic needs to underserved communities.',
//     description: 'Care for All delivers food, education and basic healthcare services to vulnerable populations across regions.',
//     contactEmail: 'contact@careforall.org',
//     approved: true,
//     attachments: ['https://images.unsplash.com/photo-1545125850-1c3b5b7d1f0f?q=80&w=1200&auto=format&fit=crop&crop=faces']
//   },
//   {
//     _id: 'seed2',
//     name: 'GreenFuture',
//     mission: 'Environmental education and tree planting drives.',
//     description: 'GreenFuture runs community tree-planting programs, environmental education for schools and neighbourhood cleanups.',
//     contactEmail: 'hello@greenfuture.org',
//     approved: true,
//     attachments: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop&crop=faces']
//   }
// ]

// exports.list = async (req, res, next) => {
//   try {
//     const ngos = await NGO.find({ approved: true })
//     // If DB has no approved NGOs, return demo seed so frontend is usable without seeding DB.
//     if (!ngos || ngos.length === 0) return res.json(demoSeed)
//     res.json(ngos)
//   } catch (err) { next(err) }
// }

// exports.get = async (req, res, next) => {
//   try {
//     // Try database first
//     const ngo = await NGO.findById(req.params.id)
//     if (ngo) return res.json(ngo)

//     // Fallback: if id matches one of demo seeds, return it
//     const seed = demoSeed.find(s => s._id === req.params.id)
//     if (seed) return res.json(seed)

//     return res.status(404).json({ message: 'Not found' })
//   } catch (err) { next(err) }
// }

// exports.create = async (req, res, next) => {
//   try {
//     const { name, mission, description, contactEmail } = req.body
//     const attachments = (req.files || []).map(f => f.filename)
//     const ngo = await NGO.create({ name, mission, description, contactEmail, attachments, approved: false })
//     res.status(201).json(ngo)
//   } catch (err) { next(err) }
// }
const NGO = require('../models/NGO.model')
const demoSeed = require('../config/demoSeed')

exports.list = async (req, res, next) => {
  try {
    const ngos = await NGO.find({ approved: true })
    // If DB has no approved NGOs, return demo seed so frontend is usable without seeding DB.
    if (!ngos || ngos.length === 0) return res.json(demoSeed)
    res.json(ngos)
  } catch (err) { next(err) }
}

exports.get = async (req, res, next) => {
  try {
    // Try database first
    const ngo = await NGO.findById(req.params.id)
    if (ngo) return res.json(ngo)

    // Fallback: if id matches one of demo seeds, return it
    const seed = demoSeed.find(s => s._id === req.params.id)
    if (seed) return res.json(seed)

    return res.status(404).json({ message: 'Not found' })
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