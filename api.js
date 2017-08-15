var express = require('express');
var router = express.Router();
var app = express();


//hbs views engine
app.set('view engine', 'hbs')


var index = require('./routes/index');
app.use('/', index);

var messages = require('./routes/messages');
app.use('/', messages);

var parcels = require('./routes/parcels');
app.use('/', parcels);

var server = app.listen(4000, function () {
	console.log('Server is running... on Port 4000');
});