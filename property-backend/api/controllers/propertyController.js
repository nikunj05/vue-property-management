const mongoose = require('mongoose')
const property = mongoose.model('property')
const lodash = require('lodash')

exports.list_all_properties = (req, res) => {
  const query = req.query.region
  var filteredByFunction = []

  property.find({}, (err, properties) => {
    if (query) {
      filteredByFunction = lodash.filter(properties, function (property) {
        return property.region === query
      })
    } else {
      filteredByFunction = properties
    }

    if (err) res.send(err)
    res.json(filteredByFunction)
  })
}

exports.create_a_property = (req, res) => {
  const newProperty = new property(req.body)
  newProperty.save((err, property) => {
    if (err) res.send(err)
    res.json(property)
  })
}

exports.read_a_property = (req, res) => {
  property.findById(req.params.id, (err, property) => {
    if (err) res.send(err)
    res.json(property)
  })
}

exports.update_a_property = (req, res) => {
  property.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, property) => {
      if (err) res.send(err)
      res.json(property)
    }
  )
}

exports.delete_a_property = (req, res) => {
  property.deleteOne({ _id: req.params.id }, (err) => {
    if (err) res.send(err)
    res.json({
      message: 'property successfully deleted',
      _id: req.params.id,
    })
  })
}
