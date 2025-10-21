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

  router.get('/adm-produto', function (req, res) {
  res.render('pages/adm-produto');
  });

  router.get('/adm-produto-novo', function (req, res) {
  res.render('pages/adm-produto-novo');
  });

  router.get('/adm-produto-list', function (req, res) {
  res.render('pages/adm-produto-list');
  });

  router.get('/adm-produto-edit', function (req, res) {
  res.render('pages/adm-produto-edit');
  });

    router.get('/adm-produto-del', function (req, res) {
  res.render('pages/adm-produto-del');
  });

  
  router.get('/adm-gestor', function (req, res) {
  res.render('pages/adm-gestor');
  });

  router.get('/adm-gestor-novo', function (req, res) {
  res.render('pages/adm-gestor-novo');
  });

  router.get('/adm-gestor-list', function (req, res) {
  res.render('pages/adm-gestor-list');
  });

  router.get('/adm-gestor-edit', function (req, res) {
  res.render('pages/adm-gestor-edit');
  });

    router.get('/adm-gestor-del', function (req, res) {
  res.render('pages/adm-gestor-del');
  });

  router.get('/adm-user', function (req, res) {
  res.render('pages/adm-user');
  });

  router.get('/adm-user-list', function (req, res) {
  res.render('pages/adm-user-list');
  });

    router.get('/adm-user-del', function (req, res) {
  res.render('pages/adm-user-del');
  });

  router.get('/ingressos', function (req, res) {
  res.render('pages/ingressos');
  });
    router.get('/faturamento', function (req, res) {
  res.render('pages/faturamento');
  });
 
  router.get('/AquaRio', function (req, res) {
  res.render('pages/AquaRio');
  });

  router.get('/aquarioCanada', function (req, res) {
  res.render('pages/aquarioCanada');
  });

  router.get('/aquarioSydney', function (req, res) {
  res.render('pages/aquarioSydney');
  });
  
router.get('/expedicoes', function (req, res) {
  res.render('pages/expedicoes');
  });

 router.get('/aquarioSydney', function (req, res) {
  res.render('pages/aquarioSydney');
  });

 router.get('/lisboa', function (req, res) {
  res.render('pages/lisboa');
  });

   router.get('/bangkok', function (req, res) {
  res.render('pages/bangkok');
  });

module.exports = router;