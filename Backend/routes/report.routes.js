const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/monthly', authMiddleware, roleMiddleware('admin'), reportController.monthly)

module.exports = router