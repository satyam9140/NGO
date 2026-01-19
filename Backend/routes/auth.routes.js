const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authController.register)

router.post('/login', authController.login)
router.get('/me', authMiddleware, authController.me)

module.exports = router