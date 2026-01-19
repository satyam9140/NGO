module.exports = (requiredRole) => (req, res, next) => {
  if (!req.userRole) return res.status(403).json({ message: 'Forbidden' })
  if (req.userRole !== requiredRole && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}