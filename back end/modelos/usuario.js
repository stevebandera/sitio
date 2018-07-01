'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = Schema({
    user:String,
    password:String,
    permisos:String
});

var modelo = mongoose.model('Usuario',usuarioSchema);

module.exports = modelo;
