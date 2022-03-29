const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    },
  },
  role: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({
    $or: [{ email: email }],
  })

  if (!user) {
    throw new Error('Invalid Credentials!')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid Credentials!')
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User

// User.countDocuments()
//   .then((data) => {
//     if (data == 0) {
//       console.log('no data')
//       addAdmin()
//     } else {
//       User.findOne({ role: 'ADMIN' }).then((result) => {
//         if (result == null) {
//           addAdmin()
//         } else {
//           console.log('There is already admin')
//         }
//       })
//     }
//   })
//   .catch((err) => {
//     console.error({ err })
//   })

// async function addAdmin() {
//   let obj = {
//     name: 'Admin',
//     email: 'admin@gmail.com',
//     password: 'admin@123',
//     role: 'ADMIN',
//   }

//   let updatedPass = await bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10))
//   obj.password = updatedPass

//   let admin = new User(obj)

//   admin.save(function (err, result) {
//     err ? console.log(err) : console.log('admin created successfully.')
//   })
// }
