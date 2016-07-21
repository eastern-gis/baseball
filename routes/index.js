var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
      title: 'Baseball',
      rootPath: '../'
  });
});

router.get( '/spanish', function( req, res ){
    console.log("Adios Amigos");
    res.render('indexSpanish');
});


router.get('/translation', function(req, res){
	console.log('Translation?');
	res.render('indexSpanish_John');
})


module.exports = router;
