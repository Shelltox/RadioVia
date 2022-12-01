var express = require('express');
var router = express.Router();
var MedioModel = require('../../models/AgregarMedioModels');
var cloudinary = require('cloudinary').v2;
var nodeMailer = require('nodemailer');

router.get('/', async function(req, res, next){
    let medios = await MedioModel.getAgregarMedio();

    medios = medios.map(medios => {
        if (medios.Logo){
            const imagen = cloudinary.url(medios.Logo, {width:960, height:200, crop:'fill'});
            medios.Logo = imagen;
            return {medios}
        }else{
            medios.Logo = '';
            return {medios}
        }
    })
    res.json(medios);
});


router.post ('/agregarmedio', async (req, res) => {
    const mail = {
        to: 'agnusdeiz@hotmail.com',
        subject: 'Agregar_Nuevo_Medio',
        html: `
                Descripcion: ${req.body.Descripcion}
                Email: ${req.body.Email}
                WhatsApp: ${req.body.WhatsApp}
                URL: ${req.body.URL}
                LinkWinamp: ${req.body.LinkWinamp}
                LinkWMP: ${req.body.LinkWMP}
                Comentarios: ${req.body.Comentarios}
                FchHoraAlta: ${req.body.FchHoraAlta}
                `
    }

    const transport = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }); 

    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message: 'El Nuevo Medio sera agregado en las proximas 72hs. Gracias!!'
    });

});

router.post ('/contacto', async (req, res) => {
    const mail = {
        to: 'agnusdeiz@hotmail.com',
        subject: 'Contacto Radiovia',
        html: `${req.body.nombre} se contacto a traves de la web y quiere mas 
               informacion a este correo: ${req.body.email} <br> Ademas, hizo 
               el siguiente comentario: ${req.body.mensaje} <br> su WhatsApp 
               es: ${req.body.telefono}`
    }

    const transport = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }); 

    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message: 'Mensaje Enviado'
    });

});

module.exports = router;