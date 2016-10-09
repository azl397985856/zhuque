var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var app = express();
const db = require('monk')('localhost/mydb')
const users = db.get('zhuque_users')

app.use(session({
  genid: function(){
    return (new Date()).getTime();
  },
  resave: false,
  saveUninitialized: true,
  secret: 'zhuque'
}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);  
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, Origin"); 
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);  
  next();
});
app.use(function(req, res, next) {
	if(!req.session.user&&req.cookies.token){
	    try{
	      var dec = decode(req.cookies.token);
	      console.log(dec);
	      var user = JSON.parse(dec);
	      users.findOne(user, function(err, data){
	        if(err){
	          console.error(err);
	          res.status(500).send(err);
	        } else {
	          if(data){
	            req.session.user = data;
	            res.app.locals.user = data;
	            logined();
	          } else {
	          	res.json({
	            	message: '自动登陆失败，请确保您没有更改过密码！'
	          	});
	          }
	        }
	      });
	    } catch(e){
	      console.error(e);
	      res.status(500).send(e);
	    }
	  } else {
	    res.app.locals.user = req.session.user;
	    logined();
	  }
	  function logined(){
	    if(!req.session.user && !/\/login*/.test(req.path) && '/'!== req.path) {
	      res.send({
	      	error: '请重新登录'
	      })
	    } else if('/login'===req.path){
	      //登陆接口
	      users.find({
	        name: req.body.name,
	        password: req.body.password
	      }, function(err, data) {
	        if (err) {
	          console.error(err);
	          res.status(500).send(err);
	        } else if (data.length) {
	          var token = encode(JSON.stringify({name: req.body.name, password: req.body.password }));
	          res.cookie('token', token);
	          res.json({
	            token: token,
	          });
	        } else {
	          res.json({
	            message: '登陆失败'
	          });
	        }
	      });
	    } else {
	      next();
	    }
	  }
});

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
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});

function encode(s) {
  'use strict';
  return s.replace(/[\d\D]/g, function($) {
      return ("000" + $.charCodeAt(0).toString(16)).slice(-4);
  });
}
function decode(s) {
  'use strict';
  return s.replace(/.{4}/g, function($) {
      return String.fromCharCode(parseInt($, 16));
  });
}

module.exports = app;
