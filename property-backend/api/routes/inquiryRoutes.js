const express = require('express')
const InquiryController = require('../controllers/inquiryController')

const router = new express.Router()

//register handler
router.post('/inquiry', InquiryController.create_a_inquiry)
router.get('/inquiries', InquiryController.list_all_inquiries)
router.get('/inquiry/:id', InquiryController.read_a_inquiry)

module.exports = router
