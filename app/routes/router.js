var express = require('express');
var router = express.Router();

router.get('/', function(req,res ){
    res.render('pages/index');
});

router.get('/cadastro', function(req,res ){
    res.render('pages/cadastro');
});

router.get('/login', function(req,res ){
    res.render('pages/login');
});

module.exports = router;