const inquiry = require('../models/inquiryModel')

exports.list_all_inquiries = (req, res) => {
  inquiry.find({}, (err, inquiries) => {
    if (err) res.send(err)
    res.json(inquiries)
  })
}

exports.create_a_inquiry = (req, res) => {
  const newInquiry = new inquiry(req.body)
  newInquiry.save((err, inquiry) => {
    if (err) res.send(err)
    res.json(inquiry)
  })
}

exports.read_a_inquiry = (req, res) => {
  inquiry.findById(req.params.id, (err, inquiry) => {
    if (err) res.send(err)
    res.json(inquiry)
  })
}
