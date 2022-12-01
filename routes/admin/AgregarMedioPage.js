var express = require('express');
var util = require('util');
var cloudinary = require('cloudinary').v2;
var router = express.Router();
var AgregarMedioModel = require('../../models/AgregarMedioModels');
var uploader = util.promisify(cloudinary.uploader.upload);
var destroy = util.promisify(cloudinary.uploader.destroy);


// LISTADO COMPLETO DE MEDIOS EN GRILLA

router.get('/', async function(req, res, next){
    var medios = await AgregarMedioModel.getAgregarMedio();

    medios = medios.map( medios => {
        if (medios.Logo){
            medios.Logo = cloudinary.image(medios.Logo, {
                width:100,
                height:100,
                crop:'fill'
            });
            return{medios}
        }else{
            return{medios}
        }
    });

    res.render('admin/AgregarMedioPage', { layout: 'admin/layout', 
                                           UserName: req.session.UserName, 
                                           UserId: req.session.UserId,
                                           medios
                                         }); //AgregarMedioPage.hbs y layout.hbs
});

//AGREGAR UN ITEM AL LISTADO

//Renderiza la vista AgregarMedioPageAlta.hbs con el formulario de carga.-
router.get('/AgregarMedioPageAlta', async function(req, res, next){
    res.render('admin/AgregarMedioPageAlta', { layout: 'admin/layout', 
                                               UserName: req.session.UserName, 
                                               UserId: req.session.UserId
                                             }); //AgregarMedioPage.hbs y layout.hbs
});

//Al guardar realiza validaciones, control de errores y si todo esta bien impacta el cambio en bd.-
router.post('/AgregarMedioPageAlta', async function(req, res, next){
    try{
        var img_id='';
        if (req.files && Object.keys(req.files).length>0){
            Logo = req.files.Logo;
            img_id= (await uploader(Logo.tempFilePath)).public_id;
        }
        
        req.body.Logo = img_id;

        if (req.body.Descripcion !="" && req.body.WhatsApp !="" && req.body.URL !=""){
        //    await AgregarMedioModel.insertAgregarMedio(req.body, img_id);
            await AgregarMedioModel.insertAgregarMedio(req.body);
            res.redirect('/admin/AgregarMedioPage');
        }else{

            res.render('admin/AgregarMedioPageAlta', { layout: 'admin/layout', 
                                                       UserName: req.session.UserName, 
                                                       UserId: req.session.UserId,
                                                       error: true,
                                                       mensaje: 'Todos los datos son requeridos: ' 
                                                     }); //AgregarMedioPageAlta.hbs y layout.hbs
        }

    }catch (error){
        res.render('admin/AgregarMedioPageAlta', { layout: 'admin/layout', 
                                                   UserName: req.session.UserName, 
                                                   UserId: req.session.UserId,
                                                   error: true,
                                                   mensaje: 'Error al intentar dar de alta un nuevo medio: ' + console.log(error)
                                                 }); //AgregarMedioPageAlta.hbs y layout.hbs
    }
});

// ELIMINAR UN ITEM DEL LISTADO

router.get('/AgregarMedioPageEliminar/:Id', async function(req, res, next){
    let Id = req.params.Id;

    let MedioPage = await AgregarMedioModel.getAgregarMedioById(Id); 
    if (MedioPage.Logo){
        await (destroy(MedioPage.Logo));
    }

    await AgregarMedioModel.eliminarAgregarMedioById(Id);
    res.redirect('/admin/AgregarMedioPage');
});

// MODIFICAR UN ITEM DEL LISTADO

router.get('/AgregarMedioPageModificar/:Id', async function(req, res, next){
    let Id = req.params.Id;
    let Datos = await AgregarMedioModel.getAgregarMedioById(Id);

    res.render('admin/AgregarMedioPageModificar', { layout: 'admin/layout', 
                                                    UserName: req.session.UserName, 
                                                    UserId: req.session.UserId,
                                                    Datos
                                                 }); //AgregarMedioPageAlta.hbs y layout.hbs
});

router.post('/AgregarMedioPageModificar', async function(req, res, next){
    try{

        // 
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if(req.body.img_delete === '1'){
            img_id=null;
            borrar_img_original=true;
        }else{
            if(req.files && Object.keys(req.files).length>0){
                Logo = req.files.Logo;
                img_id= (await uploader(Logo.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if(borrar_img_vieja && req.body.img_original){
            await (destroy(req.body.img_original));
        }

        let Obj = {
            Logo: img_id,
            Descripcion: req.body.Descripcion,
            Email: req.body.Email,
            WhatsApp: req.body.WhatsApp,
            URL: req.body.URL,
            LinkWinamp: req.body.LinkWinamp,
            LinkWMP: req.body.LinkWMP,
            Comentarios: req.body.Comentarios,
            FchHoraAlta: req.body.FchHoraAlta,
            IdUsuario: req.session.UserId
        }

        await AgregarMedioModel.modificarAgregarMedioById(Obj, req.body.IdMedio);
        res.redirect('/admin/AgregarMedioPage');
    }catch (error){
        
        res.render('admin/AgregarMedioPageModificar', { layout: 'admin/layout', 
                                                        UserName: req.session.UserName, 
                                                        UserId: req.session.UserId,
                                                        error: true,
                                                        mensaje: error
                                                      }); //AgregarMedioPageAlta.hbs y layout.hbs
    }
});

module.exports = router;