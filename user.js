const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  bio: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = User
