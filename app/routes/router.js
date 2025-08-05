var express = require('express');
var router = express.Router();

router.get('/', function(req,res ){
    res.render('pages/index');
});

router.get('/ilhagalapagos', function(req,res ){
    res.render('pages/Ilhagalapagos');
});

module.exports = router;