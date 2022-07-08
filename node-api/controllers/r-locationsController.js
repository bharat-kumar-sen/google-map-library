const Locations = require('../models/r-locationsModel');

require('dotenv').config();

exports.getLocationsList = async (req, res) => {
  Locations.getLocationsList(req, (error, data) => {
    if (data === null) {
      return res.json({
        status: 404,
        data: error,
        message: 'Some error'
      });
    } else {
      return res.json({
        status: 200,
        data: data,
        message: 'Get the locations list successfully.'
      });
    }
  });
}