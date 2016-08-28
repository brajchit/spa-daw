var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var CentroMed=require('../models/CentroMed.js');
router.get('/', function (req, res) {
  console.log('I received a get request');
    CentroMed.find({}, function (err, docs) {
    	console.log(docs);
        res.json(docs);
    });
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("query get centrosMed con exito");});
module.exports = router;
