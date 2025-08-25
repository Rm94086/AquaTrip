var express = require('express');
var router = express.Router();

router.get('/', function(req,res ){
    res.render('pages/index');
});

router.get('/ilhagalapagos', function(req,res ){
    res.render('pages/Ilhagalapagos');
});

router.get('/login', function(req,res ){
    res.render('pages/login');
});

router.get('/aquarios', function(req,res ){
    res.render('pages/aquarios');
}); 

router.get('/index.ejs', function(req,res ){
    res.render('pages/index.ejs');
});

module.exports = router;