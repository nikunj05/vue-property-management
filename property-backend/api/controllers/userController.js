const User = require('../models/userModel')

class AuthController {
  static register = async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      res.status(200).send({
        status: 200,
        message: 'Successfully Registered',
        user,
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
      })
    }
  }

  static login = async (req, res) => {
    try {
      const credential = {
        email: req.body.email,
        user_id: req.body.user_id,
        password: req.body.password,
      }

      const user = await User.findByCredentials(credential)
      const token = await user.generateAuthToken()

      res.status(200).send({
        status: 200,
        message: 'Successfully Login',
        data: {
          userData: user,
          token,
        },
      })
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
        error: {
          error: error,
        },
      })
    }
  }

  static getUserDetails = async (req, res) => {
    if (req.query.id) {
      User.findById(req.query.id, (err, user) => {
        if (err) res.send(err)
        res.status(200).send({ data: user })
      })
    }
  }
}

module.exports = AuthController
