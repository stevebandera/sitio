var express = require('express');
var BanderaControlador = require("../controladores/bandera");
var ruta = express.Router();

ruta.post("/ejecutarBandera/", BanderaControlador.ejecutarBandera);

ruta.post("/ejecutarBanderaFinal/", BanderaControlador.ejecutarBanderaFinal);

ruta.post("/altaBandera/", BanderaControlador.altaBandera);


module.exports = ruta;