const cron = require('node-cron')
const Donation = require('../models/Donation.model')
const logger = require('../utils/logger')

cron.schedule('0 0 1 * *', async () => {
  try {
    const month = new Date().getMonth()
    const count = await Donation.countDocuments()
    logger.info(`Monthly report: donations=${count} month=${month}`)
    // extend: create DB report, email admins, etc.
  } catch (err) {
    logger.error('Monthly report failed', err)
  }
})