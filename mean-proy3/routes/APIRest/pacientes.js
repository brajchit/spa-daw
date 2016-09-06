var express = require('express');
var router = express.Router();
var Muestra = require('../../models/Muestra.js');
var Usuario = require('../../models/Usuario.js');
var generator = require('generate-password');
var nodemailer = require('nodemailer');

//lista los usuarios pacientes
router.get('/enlistarPacientes', function(req, res) {
    console.log('I received a get request');
    Usuario.find({ rol: "paciente" }, function(err, docs) {
        res.json(docs);
    });
});
//obtiene todas las muestras por cedula
router.get('/cedula', function(req, res) {
    console.log('I received a get request');
    Muestra.find({
        cedula: req.session["cedula"]
    }, function(err, docs) {
        req.session.idMuestra = docs._id;
        res.json(docs);
    });
});
//obtiene una muestra para imprimir los resultados de los examenes
router.get('/examen/:id', function(req, res) {
    var id = req.params["id"];
    console.log('I received a get request');
    Muestra.findById(id, function(err, docs) {
        // req.session.idMuestra=docs._id;
        res.json(docs);
    });
});
//borra un usuario paciente
router.delete('/:id', function(req, res) {
    console.log('I received a delete request');
    Usuario.findOneAndRemove({ cedula: req.param("id") }, function(err) {
        if (err) throw err;
        // we have deleted the user
        console.log('Paciente borrado!');
    });
});

//crear paciente
router.post('/', function(req, res) {
    var password = generator.generate({
        length: 8,
        numbers: true
    });

    console.log(password); // Your unique password

    console.log('I received a post request');
    Usuario.create({
        cedula: req.body.cedula,
        user: req.body.correo,
        password: password,
        rol: "paciente",
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        direccion: "",
        telefonos: [" "]
    }, function(err, docs) {
        console.log(docs);
        res.json(docs);
    });

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'saludprimerosadaw@gmail.com',
            pass: 'dawsaludprimero'
        }
    });

    var mailOptions = {
        from: 'Salud Primero SA <saludprimerosadaw@gmail.com>',
        to: req.body.correo,
        subject: 'Notificación de registro como paciente en Salud Primero',
        text: 'Contraseña: ' + password,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Mensaje enviado: ' + info.response);
            //res.redirect('/');
        }
    })
});

//modificar UN usuario paciente
router.put('/modificar/:id', function(req, res) {

    var cedula = req.body.cedula;
    var nombres = req.body.nombres;
    var correo = req.body.correo;
    var dir = req.body.direccion1;
    var ape = req.body.apellidos;
    console.log(cedula);
    console.log(nombres);
    console.log(correo);
    console.log(ape);
    console.log(dir);
    Usuario.findOneAndUpdate({
        cedula: req.param("id")
    }, {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        direccion: req.body.direccion1
    }, function(err, docs) {
        if (err) throw err;

        // we have the updated user returned to us
        console.log(docs);
    });
});

//lista UN usuarios pacientes por cedula
router.get('/', function(req, res) {
    console.log('I received a get request');
    Usuario.find({
        cedula: req.session["cedula"]
    }, function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

//modificar UN usuario paciente con SESSION
router.put('/', function(req, res) {

    var cedula = req.body.cedula;
    var nombres = req.body.nombres;
    var correo = req.body.correo;
    var dir = req.body.direccion1;
    var ape = req.body.apellidos;
    console.log(cedula);
    console.log(nombres);
    console.log(correo);
    console.log(ape);
    console.log(dir);
    Usuario.findByIdAndUpdate(req.session["idPaciente"], {
        $set: {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            direccion: req.body.direccion1
        }
    }, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});


module.exports = router;
