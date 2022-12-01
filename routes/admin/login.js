var express = require('express');
var router = express.Router();
var usuarioModel = require('./../../models/usuarioModels');

/* GET Login del Admin. */
router.get('/', function (req, res, next) {
  res.render('admin/login', { layout: 'admin/layout'}); //login.hbs y layout.hbs
});

router.post('/', async(req, res, next) => {
  try{
    var usuario = req.body.UserNombre;
    var password = req.body.UserPass;

    var data = await usuarioModel.getUserByUsernameAndPassword(usuario, password);
    if (data != undefined){
      req.session.UserId = data.id;
      req.session.UserName = data.usuario;
      res.redirect('/admin/AgregarMedioPage');
    }else{
      res.render('admin/login', {layout: 'admin/layout', error:true});
    }

  }catch(error){
    console.log(error);
  }
});


module.exports = router;