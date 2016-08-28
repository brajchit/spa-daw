var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index.ejs', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//paciente
router.get('/sucursal.ejs', function(req, res, next) {
    res.render('sucursal', {
        title: 'Express'
    });
});

router.get('/sucursales.ejs', function(req, res, next) {
    res.render('sucursales', {
        title: 'Express', layout: false
    });
});
router.get('/misdatos', function(req, res, next) {
    res.render('misdatos', {
        title: 'Express', layout: false
    });
});
router.get('/misexamenes.ejs', function(req, res, next) {
    res.render('misexamenes', {
        title: 'Express', layout: false
    });
});


//operario
router.get('/muestra-crear.ejs', function(req, res, next) {
    res.render('muestra-crear', {
        title: 'Express'
    });
});

router.get('/ingresomuestra.ejs', function(req, res, next) {
    res.render('ingresomuestra', {
        title: 'Express'
    });
});

router.get('/pacientes.ejs', function(req, res, next) {
    res.render('pacientes', {
        title: 'Express'
    });
});
router.get('/paciente-crear.ejs', function(req, res, next) {
    res.render('paciente-crear', {
        title: 'Express'
    });
});
router.get('/muestras-index.ejs', function(req, res, next) {
    res.render('muestras-index', {
        title: 'Express'
    });
});

//estadisticas
router.get('/estadisticas.ejs', function(req, res, next) {
    res.render('estadisticas', {
        title: 'Express'
    });
});

router.get('/prueba-estadistica.ejs', function(req, res, next) {
    res.render('prueba-estadistica', {
        title: 'Express'
    });
});
router.get('/prueba-estadistica2.php', function(req, res, next) {
    res.render('prueba-estadistica2', {
        title: 'Express'
    });
});

//laborator
router.get('/lista-muestras', function(req, res, next) { /*bk*/
    res.render('lista-muestras', {
        title: 'Express'
    });
});

router.get('/listaDeResultados.ejs', function(req, res, next) {
    res.render('listaDeResultados', {
        title: 'Express'
    });
});


router.get('/mmm', function(req, res){
    res.render('example', {title: 'express-hbs'})
});

module.exports = router;
