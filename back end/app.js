/*
Definición de la aplicación
*/
//Requerimientos externos
var express = require('express');
var bodyParser = require('body-parser');
//Carga las rutas necesarias para la app
var rutaUsuario = require('./rutas/usuario');
var rutaBandera = require('./rutas/bandera');

var app = express();
//Configura la forma en la que se va a acceder a los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Archivos estáticos
app.use(express.static('sitio'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});

//Utiliza las rutas cargadas
app.use("/usuario/", rutaUsuario);
app.use("/bandera/", rutaBandera);


//Exporta la app para que sea posible utilizarla en el archivo index.js
module.exports = app;