const Locations = require('../models/r-crud-locationsModel');

require('dotenv').config();

exports.getCRUDLocationsList = async (req, res) => {
  Locations.getCRUDLocationsList(req, (error, data) => {
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

exports.postCRUDLocationsList = async (req, res) => {
  Locations.postCRUDLocationsList(req, (error, data) => {
    if (data === null) {
      console.log('POST--data into controller===', data);
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