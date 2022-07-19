var dbConnection = require('../core/rdb');
var DbConnect = dbConnection.db;

exports.getLocationsList = (res, cb) => {
  DbConnect.from('locations').then((result) => {
    console.log('result=====', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.postLocationsList = (req, cb) => {
  var data =  req.body;
  console.log('Data into Model===', data);
  DbConnect.from('locations').insert(data).then((result) => {
    console.log('result=====', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}