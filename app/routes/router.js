var express = require('express');
var router = express.Router();

router.get('/', function(req,res ){
    res.render('pages/homedoispontozero');
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

router.get('/pagamento', function(req,res ){
    res.render('pages/pagamento.ejs');
});

router.get('/aquariosp', function (req,res ){
    res.render('pages/aquariosp');
});

router.get('/monteray', (req, res) => {
  res.render('pages/monteray');
});

router.get('/cenotes', function (req, res) {
  res.render('pages/cenotes');
});

router.get('/ilhaacores', function (req, res) {
  res.render('pages/ilhaacores');
});

router.get('/homedoispontozero', function (req, res) {
  res.render('pages/homedoispontozero');
});

router.get('/perfil', function (req, res) {
  res.render('pages/perfil');
});

router.get('/avaliacao', function (req, res) {
  res.render('pages/avaliacao');
});

router.get('/index-adm', function (req, res) {
  res.render('pages/index-adm');
  });

  router.get('/contato', function (req, res) {
  res.render('pages/contato');
  });

  router.get('/adm-cliente', function (req, res) {
  res.render('pages/adm-cliente');
  });

  router.get('/adm-cliente-novo', function (req, res) {
  res.render('pages/adm-cliente-novo');
  });

  router.get('/adm-cliente-list', function (req, res) {
  res.render('pages/adm-cliente-list');
  });

  router.get('/adm-cliente-edit', function (req, res) {
  res.render('pages/adm-cliente-edit');
  });

    router.get('/adm-cliente-del', function (req, res) {
  res.render('pages/adm-cliente-del');
  });

  router.get('/ingressos', function (req, res) {
  res.render('pages/ingressos');
  });
      router.get('/faturamento', function (req, res) {
  res.render('pages/faturamento');
  });
 
module.exports = router;