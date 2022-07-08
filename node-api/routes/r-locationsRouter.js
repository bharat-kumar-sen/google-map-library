const express = require('express');
const router = express.Router();
const Locations =require('../controllers/r-locationsController');

router.get('/getLocationsList', Locations.getLocationsList);

module.exports = router;