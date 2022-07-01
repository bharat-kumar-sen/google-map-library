/**
 * Name: users Modal
 * @description :: Server-side database query for all users action.
 */

/** Here We are importing database connection file for db connection*/

var dbConnection = require('../core/db');
var DbConnect = dbConnection.db;



/**
 * Name : getUser(): 
 * Description : This method will find user from db for the Admin login.
 * @param {*} req is a login credential
 * Cb: Cb is call back function. it will return login user info.
 */
exports.test = (req, cb) => {
  var data = req.body;
  console.log("data=======", data);
  DbConnect.from('marker').first().where('email', '=', data.email)
    .then((result) => {
      if (result) {
        cb(null, result)
      } else {
        cb(true, null);
      }
    }).catch((err) => {
      console.log("err========", err);
      cb(err, null);
    });
}