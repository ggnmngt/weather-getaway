const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  temperatures: [{
    month: {
      type: String,
      required: true,
    },
    averageHigh: {
      type: Number,
      required: true,
    },
    averageLow: {
      type: Number,
      required: true,
    },
  }],
});

const City = mongoose.model('City', citySchema);

module.exports = City;
