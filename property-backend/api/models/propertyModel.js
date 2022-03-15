const mongoose = require('mongoose')

const { Schema } = mongoose

const propertySchema = new Schema(
  {
    title: {
      type: String,
    },
    main_image: {
      type: String,
    },
    address: {
      type: String,
    },
    home_type: {
      type: String,
    },
    sqft: {
      type: String,
    },
    bhk: {
      type: String,
    },
    gallery: {
      type: Array,
    },
    facts_features: {
      type: String,
    },
    price: {
      type: Number,
    },
    coordinates: {
      type: Array,
    },
    region: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { collection: 'property' }
)

module.exports = mongoose.model('property', propertySchema)
