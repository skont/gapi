var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey', message: '<h3>Usage</h3><ul><li>/msg/in</li><li>/msg/out</li><li>/msg/action</li><li>/parcels?machine=...</li><li>/parcels?extid=...</li></ul>' });
  //res.send('test');
  console.log('Index request');
});

module.exports = router;
