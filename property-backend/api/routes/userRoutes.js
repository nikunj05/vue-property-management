const express = require('express')
const AuthController = require('../controllers/userController')

const router = new express.Router()

//register handler
router.post('/registration', AuthController.register)
router.post('/signin', AuthController.login)
router.get('/me', AuthController.getUserDetails)

module.exports = router
