var sql = require('mssql');
var squel=require('squel');
var bodyParser=require('Body-Parser');

var express = require('express');
var router = express.Router();

var config=require('../db.json');

//test post
router.get('/form', function(req, res, next){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="/form" method="post">' +
               'Enter your name:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';
               
  res.send(html);
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
router.post('/form', function(req, res, next){
  // var userName = req.body.userName;
  // var html = 'Hello: ' + userName + '.<br>' +
  //            '<a href="/form">Try again.</a>';
  // res.send(html);

//console.log(req.body.userName); 

sql.connect(config, function (err) {

var request = new sql.Request();

var ins = squel.insert();
        
        ins.into('INCOMINGMESSAGE')
        .set('ExtSystem', 'GreyconApi')
        .set('MessageConts',req.body.conts)
        .set('IssueDate', squel.str('getdate()'))
        .set('MsgStatus', 1)
        .set('Upuser', req.body.userName)
        .set('Uptime', squel.str('getdate()'));
        
console.log(ins.toString());

request.query(ins.toString());

res.send('Done');

});
});

module.exports = router;