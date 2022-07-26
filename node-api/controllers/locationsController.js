const Locations = require("../models/locationsModel");
// const globalService = require("../core/globalService");
// const config = require("../core/configSetting.js");
// var jwt = require('jsonwebtoken');
var MD5 = require('md5');
require("dotenv").config();

exports.getLocationsList = async (req, res) => {
  Locations.getLocationsList(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "Some error occurred!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Get the locations list successfully.',
        data: data,
      });
    }
  });
};
exports.getLocations = async (req, res) => {
  Locations.getLocations(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "Some error occurred!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Get the locations list successfully.',
        data: data,
      });
    }
  });
};
exports.saveLocations = async (req, res) => {
  Locations.saveLocations(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "Some error occurred!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Save location successfully.',
        data: data,
      });
    }
  });
};
exports.searchLocationSave = async (req, res) => {
  Locations.searchLocationSave(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "Some error occurred!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Save location successfully.',
        data: data,
      });
    }
  });
};
exports.deletelocation = async (req, res) => {
  Locations.deletelocation(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "Some error occurred!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Location deleted successfully.',
        data: data,
      });
    }
  });
};
