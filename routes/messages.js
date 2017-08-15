var sql = require('mssql');
var squel=require('squel').useFlavour('mssql');
var bodyParser=require('Body-Parser');

var express = require('express');
var router = express.Router();

var config=require('../db.json');

router.get('/msg/:type', function (req, res, next) { 

console.log('Messages request');
// connect to your database
sql.connect(config, function (err) {

if (err) console.log(err);

// create Request object
var request = new sql.Request();
var q=squel.select();

if (req.params.type == 'in'){
	q.from('incomingmessage')
 	.order('msgcount',false);
}
else if (req.params.type == 'out') {
	q.from('outgoingmessage')
 	.order('msgcount',false);
}
else if (req.params.type == 'action') {
	q.from('actionqueue')
	.order('actionindex',false);
};
 
console.log(req.params.type);
// query to the database and get the data
request.query(q.toString(), function (err, recordset) {
	console.log(q.toString());

 	if (err) console.log(err)
 		res.send(recordset);
 });
});
});

module.exports = router;