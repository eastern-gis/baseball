var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('./bin/config');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Served.");
  res.render('index');//{
     // title: 'Baseball',
     // rootPath: '../'
 // });
    console.log("Done render");
});

router.get( '/spanish', function( req, res ){
    console.log("Adios Amigos");
    res.render('indexSpanish');
});

router.get('/data', function( req, res ){
    console.log('Get data' );
    console.log( config );
    
});

module.exports = router;
