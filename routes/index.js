
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 
  //res.redirect('/admin/login', {title: 'Ingreso a la Administracion del Sitio'});
});

module.exports = router;

