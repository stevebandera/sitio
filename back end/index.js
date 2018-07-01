/*

Ejemplo de estructura de un proyecto Node sin utilizar base de datos

*/
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;
var urlMongo = "mongodb://localhost:27017/banderas";
mongoose.Promise = global.Promise;
mongoose.connect(urlMongo,function(err,res){
    if (err){
        throw err;
    }else{
        app.listen(port, function() {
            
          console.log("API REST corriendo en http://localhost:" + port);
            
        })
    }
});
