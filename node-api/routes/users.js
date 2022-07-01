/**
 * Name: users route
 * @description : Here is define Server-side all users module url
 */
var express = require('express');
var router = express.Router();

/** Here We are importing users.controller for the users route link to users controller*/
const users = require('./../controllers/users.controller.js');
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', users.test);
module.exports = router;