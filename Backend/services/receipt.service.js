const fs = require('fs')
const path = require('path')

exports.generateReceipt = (donation) => {
  // Very simple receipt string, replace with PDF generator as needed
  const content = `Receipt\nDonation: ${donation._id}\nAmount: ${donation.amount}\nNGO: ${donation.ngo}\nDate: ${new Date(donation.createdAt).toLocaleString()}`
  const filename = `receipt_${donation._id}.txt`
  const filePath = path.join(__dirname, '..', 'tmp', filename)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
  return filePath
}