/*global module,require*/
var express = require('express');
var router = express.Router();
const db = require('monk')('localhost/mydb')
const logs = db.get('zhuque_logs')

// for cors
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);  
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, Origin"); 
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", false);  
  next();
});

router.all('/log', function (req, res) {
  // 1.security check, if passed, then insert record
  // 2.key field check
  // 3.insert
  logs.insert(req.body);
  // 4.response
  res.send(req.body);
})
.get('/getAll', function (req, res) {
  // getAll just for test
  logs.find({}).then(function(q) {res.send(q)});
})
.post('/search', function (req, res) {
  // 1.security check, if passed, then insert record
  // 2.key field check
  if (req.body.type === '') {
    delete req.body.type;
  }
  if (req.body.userAgent === '') {
    delete req.body.userAgent;
  }
  if (req.body.time === '') {
    delete req.body.time;
  }
  var start;
  var end;
  if (req.body.time) {
    start = req.body.time[0];
    end = req.body.time[1];
    delete req.body.time;
  }
  // 3.get querys and find by query
  logs.find(req.body).then(
    function(q) {
      if (start) {
        console.log(q.filter(function(row) {
          return row.time < start && row.time > end;
        }));
        res.send(q.filter(function(row) {
          return row.time >= start && row.time <= end;
        }));
      } else {
        res.send(q);
      }
    });
})
.all('*', function (req, res) {
  console.log(req.path, req.method);
  res.end();
 });

module.exports = router;
