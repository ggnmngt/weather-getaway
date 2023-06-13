const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/', cityController.createCity);
router.get('/', cityController.getCities);
router.get('/search', cityController.getCitiesByTemperature);

module.exports = router;
