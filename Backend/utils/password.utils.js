const bcrypt = require('bcryptjs')
exports.hash = (password) => bcrypt.hash(password, 10)
exports.compare = (plain, hash) => bcrypt.compare(plain, hash)