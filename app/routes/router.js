var express = require('express');
var router = express.Router();

router.get('/', function(req,res ){
    res.render('pages/index');
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

module.exports = router;