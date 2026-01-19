const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')
exports.sign = (payload, opts = {}) => jwt.sign(payload, jwtSecret, { expiresIn: '7d', ...opts })