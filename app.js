var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongo = require('mongodb');
var config = require('./config.js');
//var monk = require('monk');
var url = 'localhost:27017/tjmun_api_test';
//var url = config.database.url + config.database.dbname;
//var db = monk('localhost:27017/nodeuserlist');
//var db = monk(url);
var sessions = require('client-sessions');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tjmundb');

var routes = require('./routes/index');
var users = require('./routes/users');
var msessions = require('./routes/msessions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*app.use(sessions({
    cookieName: 'session',
    secret: config.cookieSecret,
    duration: 30 * 60* 1000,
    activeDuration: 5 * 60 * 1000
}));*/



app.use(express.static(path.join(__dirname, 'public')));
/*app.use(function(req, res, next) {
   req.db = db;
   next(); 
});*/

app.use('/api/users', users);
app.use('/api/sessions', msessions);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;