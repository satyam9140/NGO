const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.post('/ngos/:id/approve', authMiddleware, roleMiddleware('admin'), adminController.approveNGO)

module.exports = router