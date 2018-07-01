'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var banderaSchema = Schema({
    banderaId:String,
    banderaParm:String,
    parmFinal:String
});

var modelo = mongoose.model('Bandera',banderaSchema);

module.exports = modelo;
