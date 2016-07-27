var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../bin/config.js');
var Client = pg.Client;
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
    var connectionString = 'pg://'+ config.uname + ':' + config.psk +
	'@' + config.host + ":" +config.port + "/" +config.db;
    console.log( connectionString );
    var client = new Client( connectionString );
//    console.log( client );
    client.connect( function(err){
	if (err)
	    console.log("DB Connection Error ", err );
	client.query('SELECT * FROM "a1993";',[], function( err, result ){
	    if( err )
		console.log("Query Error: ", err );
	    else
		res.json( result );
	    
	});
	
    });
    console.log("Done data routing");
});

module.exports = router;
