var createError = require("http-errors");
const express = require("express");
const app = express();
const session = require('express-session');
var path = require("path");
var bodyParser = require('body-parser'),
  cors = require("cors")
const mongoose = require('mongoose')
var cookieParser = require("cookie-parser");
const logger = require('morgan');


var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var locationsRouter = require("./routes/locations");
var rLocationsRouter = require('./routes/r-locationsRouter');
const dotenv = require("dotenv");
dotenv.config();

// session setup
app.use(session({
  secret: process.env.SESSION_SECRETKEY,
  proxy: true,
  resave: true,
  saveUninitialized: true
}));



// view engine setup
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('photos'));
app.use(logger('dev'));
app.use(express.json()); //Used to parse JSON bodies
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);


app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/markers", locationsRouter);
app.use('/rMarkers', rLocationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// PLEASE UNCOMMENT CODE ON AWS/DIGITALOCEAN SERVER FOR PM2 AND FOREVER but don't need it with microservice
// app.listen(process.env.PORT, function () {
//   console.log('Listening on ', process.env.PORT);
// });

module.exports = app;