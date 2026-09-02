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

router.get('/dados_pagamento', function(req,res ){
    res.render('pages/dados_pagamento');
});

router.get('/perfil', function(req,res ){
    res.render('pages/perfil');
});

router.get('/produto', function(req,res ){
    res.render('pages/produto');
});

router.get('/aquarios', function(req,res ){
    res.render('pages/aquarios');
});

router.get('/praias', function(req,res ){
    res.render('pages/praias');
});

router.get('/pesca', function(req,res ){
    res.render('pages/pesca');
});

router.get('/caiaque', function(req,res ){
    res.render('pages/caiaque');
});

router.get('/mergulho', function(req,res ){
    res.render('pages/mergulho');
});

router.get('/avaliacao', function(req,res ){
    res.render('pages/avaliacao');
});

router.get('/header', function(req,res ){
    res.render('partials/header');
});

router.get('/admin', function(req,res ){
    res.render('pages/admin');
});

router.get('/expedicoes', function(req,res ){
    res.render('pages/expedicoes');
});

router.get('/viagens', function(req,res ){
    res.render('pages/viagens');
});

router.get('/ingressos', function(req,res ){
    res.render('pages/ingressos');
});

router.get('/produto_churaumi', function(req,res ){
    res.render('pages/produto_churaumi');
});

router.get('/gestao', function(req,res ){
    res.render('pages/gestao');
});

router.get('/criar_experiencia', function(req,res ){
    res.render('pages/criar_experiencia');
});

router.get('/perfil_editado', function(req,res ){
    res.render('pages/perfil_editado');
});
 
router.get('/riosbonito', function(req,res ){
    res.render('pages/riosbonito');
});
 
router.get('/amazonica', function(req,res ){
    res.render('pages/amazonica');
});
 
router.get('/arraialdocabo', function(req,res ){
    res.render('pages/arraialdocabo');
});
 
router.get('/angradosreis', function(req,res ){
    res.render('pages/angradosreis');
});
 
router.get('/baleias', function(req,res ){
    res.render('pages/baleias');
});
 
router.get('/ilhabela', function(req,res ){
    res.render('pages/ilhabela');
});

router.get('/oceanic', function(req,res ){
    res.render('pages/oceanic');
});

router.get('/aquarioubatuba', function(req,res ){
    res.render('pages/aquarioubatuba');
});

router.get('/aquariorj', function(req,res ){
    res.render('pages/aquariorj');
});


module.exports = router;
