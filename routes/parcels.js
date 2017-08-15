var sql = require('mssql');
var squel=require('squel').useFlavour('mssql');
var bodyParser=require('Body-Parser');

var express = require('express');
var router = express.Router();

var config=require('../db.json');


router.get('/parcels', function (req, res, next) { 
console.log('Parcels request');

// connect to your database
sql.connect(config, function (err) {

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

module.exports = router;
