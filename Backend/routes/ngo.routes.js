const express = require('express')
const router = express.Router()
const ngoController = require('../controllers/ngo.controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', ngoController.list)
router.get('/:id', ngoController.get)
router.post('/', authMiddleware, upload.array('attachments', 5), ngoController.create)

module.exports = router