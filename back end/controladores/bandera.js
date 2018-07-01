var Bandera = require('../modelos/bandera');

var ejecutarBandera = function(req,res){
    var bandera = Bandera.find({banderaId:req.body.bandera,
                                banderaParm:req.body.parametro});
    bandera.exec(function(err,respuesta){
        res.json(respuesta);
    });
}

var ejecutarBanderaFinal = function(req,res){
    var parametro = "" + req.body.parmUno + req.body.parmDos + req.body.parmTres + req.body.parmCuatro;
    console.log(parametro);
    var bandera = Bandera.find({banderaId:"banderaCinco",
                                banderaParm:parametro});

    bandera.exec(function(err,respuesta){
        res.json(respuesta);
    });
}

var altaBandera = function(req, res) {
    if (req.method == "POST") {
        var unaBandera = new Bandera();
        unaBandera.banderaId = req.body.banderaId;
        unaBandera.banderaParm = req.body.banderaParm;
        unaBandera.parmFinal = req.body.parmFinal;

        var promise = unaBandera.save();
        promise.then(function(doc) {
            res.send(doc);
            console.log(doc);
        });
        promise.catch(function(err) {
            //Mostrando el error en el browser
            res.status(400).end("Ocurrió un error: " + err);
        });

    }
    //res.status(200).end();
}


//Es necesario exportar todos los métodos que quieran ser utilizados desde rutas
module.exports = { ejecutarBandera, ejecutarBanderaFinal, altaBandera };