const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')

module.exports = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, jwtSecret)
    req.userId = payload.id || payload._id || payload.id
    req.userRole = payload.role
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}