const nodemailer = require('nodemailer')
const { smtp } = require('../config/env')

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.port === 465,
  auth: { user: smtp.user, pass: smtp.pass }
})

exports.send = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({ from: smtp.user, to, subject, text, html })
  return info
}