const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const path = require('path')
const logger = require('./utils/logger')
const authRoutes = require('./routes/auth.routes')
const ngoRoutes = require('./routes/ngo.routes')
const donationRoutes = require('./routes/donation.routes')
const adminRoutes = require('./routes/admin.routes')
const reportRoutes = require('./routes/report.routes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: logger.stream }))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/ngos', ngoRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/reports', reportRoutes)

app.get('/', (req, res) => res.json({ status: 'OK' }))
app.use(errorMiddleware)

module.exports = app