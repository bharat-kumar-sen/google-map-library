var dbConnection = require('../core/rdb');
var DbConnect = dbConnection.db;

exports.getCRUDLocationsList = (res, cb) => {
  DbConnect.from('crud-locations').then((result) => {
    // console.log('result=====', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.postCRUDLocationsList = (req, cb) => {
  var data = req.body;
  console.log('Data into Model===', data);
  DbConnect.from('crud-locations').insert(data).then((result) => {
    console.log('Post result in model=====', result);
    if (result) {
      cb(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err) => {
    cb(err, null);
  });
}

exports.postCRUDLocationsList = (req, cd) => {
  var data = req.body;
  console.log('CRUD Update Data Into Model', data);
  DbConnect.from('crud-locations').insert(data).then((result) => {
    console.log('CRUD Updata result in Model', result);
    if (result){
      cd(null, result)
    } else {
      cb(true, null);
    }
  }).catch((err)=> {
    cb(err, null);
  });
}