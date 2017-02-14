var express = require('express');
var app = express();
var sql = require("mssql");
var squel=require("squel");

// config for your database
 var config=(require('./db.json'));

 app.get('/', function (req, res) {
  res.send('<h3>Usage</h3><ul><li>/msg/in</li><li>/msg/out</li><li>/msg/action</li><li>/parcels?machine=...</li><li>/parcels?extid=...</li></ul>')
})


app.get('/parcels', function (req, res) { 
 
 // connect to your database
 sql.connect(config, function (err) {
 
//var id = req.params.id;

 if (err) console.log(err);
 
 // create Request object
 var request = new sql.Request();

 var q=squel.select();


  if (req.query.machine){
	q.from('parcel')
	.field('id')
	.field('extid')
	.field('machinecodecreate')
	.where('machinecodecreate=?', req.query.machine );

  };

  if (req.query.extid){
  	q.from('parcel')
	.field('id')
	.field('extid')
	.field('machinecodecreate')
	.where('extid= ?', req.query.extid );
  };

 // query to the database and get the data
 request.query(q.toString(), function (err, recordset) {
 	console.log(q.toString());

 if (err) console.log(err)

 // send data as a response
 res.send(recordset);
 
 });
 });
});

app.get('/msg/:type', function (req, res) { 
 
 // connect to your database
 sql.connect(config, function (err) {
 
 if (err) console.log(err);
 
 // create Request object
 var request = new sql.Request();

  var q=squel.select();


  if (req.params.type == 'in'){
	q.from('incomingmessage')
	.order('msgcount',false);
}else if (req.params.type == 'out') {
q.from('outgoingmessage')
	.order('msgcount',false);
}else if (req.params.type == 'action') {
	q.from('actionqueue')
	.order('actionindex',false);
  };
 
 // query to the database and get the data
 request.query(q.toString(), function (err, recordset) {
     console.log(q.toString());
 
 if (err) console.log(err)
 
 // send data as a response
 res.send(recordset);
 
 });
 });
});

var server = app.listen(4000, function () {
 console.log('Server is running... on Port 4000');
});