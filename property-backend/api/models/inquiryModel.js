const mongoose = require('mongoose')

const { Schema } = mongoose

const inquirySchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    captcha: {
      type: Boolean,
    },
  },
  { collection: 'inquiry' }
)

module.exports = mongoose.model('inquiry', inquirySchema)
