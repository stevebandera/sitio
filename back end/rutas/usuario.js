var express = require('express');
var UsuarioControlador = require("../controladores/usuario");
var ruta = express.Router();

ruta.post("/logIn/", UsuarioControlador.logIn);

ruta.post("/altaUsuario/", UsuarioControlador.altaUsuario);

module.exports = ruta;