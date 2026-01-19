const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const { jwtSecret } = require('../config/env')

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already used' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })
    res.status(201).json({ message: 'Registered' })
  } catch (err) { next(err) }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '7d' })
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) { next(err) }
}

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash')
    res.json(user)
  } catch (err) { next(err) }
}