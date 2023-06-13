const City = require('../models/city');

// Create a new city
const createCity = async (req, res) => {
  try {
    const { name, country, continent, temperatures } = req.body;

    const city = new City({
      name,
      country,
      continent,
      temperatures,
    });

    await city.save();

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cities
const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cities by average temperature for a specific month
const getCitiesByTemperature = async (req, res) => {
  try {
    const { month, temperature } = req.query;

    const cities = await City.find({
      temperatures: {
        $elemMatch: {
          month,
          averageHigh: { $gte: temperature - 5 },
          averageLow: { $lte: temperature + 5 },
        },
      },
    });

    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCity,
  getCities,
  getCitiesByTemperature,
};
