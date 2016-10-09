/*global module,require*/
var express = require('express');
var router = express.Router();
const db = require('monk')('localhost/mydb')
const logs = db.get('zhuque_logs')
const users = db.get('zhuque_users')

router.all('/log', function (req, res) {
  // 1.security check, if passed, then insert record
  // 2.key field check
  // 3.insert
  logs.insert(req.body);
  // 4.response
  res.send(req.body);
})
.all('/logout', function(req, res) {
  res.clearCookie('token');
  res.json({
    message: '注销成功！'
  });
})
.post('/search', function (req, res) {
  // 1.security check
  // 假如第三方登录平台给我返回的userId = 1089288
  // 2.key field check
  console.log(req.body);
  if (req.body.type === '') {
    delete req.body.type;
  }
  if (req.body.userAgent === '') {
    delete req.body.userAgent;
  }
  if (req.body.time === '') {
    delete req.body.time;
  }
  if (req.body.userId === '') {
    delete req.body.userId;
  }
  var start;
  var end;
  if (req.body.time) {
    start = req.body.time[0];
    end = req.body.time[1];
    delete req.body.time;
  }
  req.body.userId = '1089288' // 假如第三方登录平台给我返回的userId = 1089288
  // 3.find by query
  logs.find(req.body).then(
    function(q) {
      if (start) {
        res.send(q.filter(function(row) {
          return row.time >= start && row.time <= end;
        }));
      } else {
        res.send(q);
      }
    });
})
.all('/dashboard', function (req, res) {
  // 1.security check
  // 2.get count from db
  var errorCount;
  var perfCount;
  logs.count({
    type: 'error',
    userId: '1089288' // 假如第三方登录平台给我返回的userId = 1089288
  }).then(function(count) {
    errorCount = count;
  }).then(function() {
     logs.count({
      type: 'performance',
      userId: '1089288' // 假如第三方登录平台给我返回的userId = 1089288
    }).then(function(count) {
      perfCount = count;
    }).then(function() {
      res.send({
      errorCount: errorCount,
      perfCount: perfCount
    });
    });
  });
})
.all('*', function (req, res) {
  console.log(req.path, req.method);
  res.end();
 });

module.exports = router;
