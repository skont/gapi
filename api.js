var express = require('express');
var router = express.Router();
var path = require("path");
var hbs = require('express-hbs')
var app = express();

//support parsing of application/json type post data

var bodyParser = require('body-parser')
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//hbs views engine
app.set('view engine', 'hbs')

// configure the view engine 
app.engine('hbs', hbs.express4({  
  defaultLayout: __dirname + '/views/layouts/default.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));

// configure views path
app.set('views', path.join(__dirname,'/views'));

//configure teh routes
var index = require('./routes/index');
app.use('/', index);

var messages = require('./routes/messages');
app.use('/', messages);

var parcels = require('./routes/parcels');
app.use('/', parcels);


var createMessages =  require('./routes/createMessages');
app.use('/', createMessages);

var server = app.listen(4000, function () {
	console.log('Server is running... on Port 4000');
});