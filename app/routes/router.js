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

router.get('/contato', function(req,res ){
    res.render('pages/contato');
});

router.get('/mercado-pago', function(req,res ){
    res.render('pages/mercado-pago');
});

router.get('/Qr-code', function(req,res ){
    res.render('pages/Qr-code');
});

router.get('/dados_pagamento', function(req,res ){
    res.render('pages/dados_pagamento');
});

module.exports = router;