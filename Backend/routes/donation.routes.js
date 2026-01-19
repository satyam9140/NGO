const express = require('express')
const router = express.Router()
const donationController = require('../controllers/donation.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/donations', donationController.createDonation);
router.post('/', authMiddleware, donationController.create)
router.get('/history', authMiddleware, donationController.history)
router.get('/:id/receipt', authMiddleware, donationController.receipt)

module.exports = router