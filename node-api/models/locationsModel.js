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
exports.getLocationsList = (req, cb) => {
  // var data = req.body;
  // DbConnect.from('locations').then((result) => {
  DbConnect.from('locations').orderBy('createdAt', 'desc').then((result) => {
    console.log('result ==', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.getLocations = (req, cb) => {
  // var data = req.body;
  // DbConnect.from('locations').then((result) => {
  DbConnect.from('locationsDataTable').orderBy('createdAt', 'desc').then((result) => {
    console.log('result ==', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.saveLocations = (req, cb) => {
  // get data add to the table called drap_drop_location..
  var data = req.body;
  console.log('data == ', data);
  // DbConnect.from('drap_drop_location').insert(data).then((result) => {
  DbConnect.from('locations').insert(data).then((result) => {
    console.log('result ==', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.searchLocationSave = (req, cb) => {
  // get data add to the table called drap_drop_location..
  var data = req.body;
  console.log('data == ', data);
  if(data.id) {
    DbConnect.from('locationsDataTable').where({id: data.id}).update(data).then((result) => {
      console.log('result ==', result);
      if (result) {
        cb(null, result)
      } else {
        cb(true, null);
      }
    }).catch((err) => {
      cb(err, null);
    });
  } else {
    // DbConnect.from('drap_drop_location').insert(data).then((result) => {
      DbConnect.from('locationsDataTable').insert(data).then((result) => {
        console.log('result ==', result);
        if (result) {
          cb(null, result)
        } else {
          cb(true, null);
        }
      }).catch((err) => {
        cb(err, null);
      });
    }
  }
  
  exports.deletelocation = (req, cb) => {
    // get data add to the table called drap_drop_location..
    var data = req.body;
    console.log('data == ', data);
    DbConnect.from('locationsDataTable').where({id: data.id}).delete(data).then((result) => {
      console.log('result ==', result);
      if (result) {
        cb(null, result)
      } else {
        cb(true, null);
      }
    }).catch((err) => {
      cb(err, null);
    });
  }

  /* var queryString = "INSERT INTO drap_drop_location (location_address) VALUES ('Highway 37')";
  var queryString = "INSERT INTO drap_drop_location (location_address) VALUES (?)";
  con.query(queryString,[L_address] ,function (err, result) {
    if (err) {
      // Throw your error output here.
      console.log("An error occurred.");
    } else {
      // Throw a success message here.
      console.log("1 record inserted: " + result.affectedRows);
    }
    // if (err) throw err;
  });
 */

/*   DbConnect.promise()
  .execute("INSERT INTO `users`(`name`,`age`,`email`) VALUES(?, ?, ?)",[_name, _age, _email])
  .then(([result]) => {
      // console.log(result);
      if(result.affectedRows === 1){
          console.log("User Inserted");
      }
  }).catch(err => {
      console.log(err);
  });
 */