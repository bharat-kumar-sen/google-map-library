/**
 * Name: users.controller
 * @description :: Server-side logic for all users action.
 */

/** Here We are importing users.model for the users Controller link to users modal*/
const Users = require('../models/users.model.js');
require('dotenv').config();
var MD5 = require('md5');


exports.test = (req, res) => {
  console.log("req==========", req.body)
  Users.test(req, (err, data) => {
    if (data === null) {
      return res.json({
        status: 500,
        message: "There are some error in fetch count data of dashboard!",
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Dashboard data fetch successfully.',
        data: data,
      });
    }
  });
};