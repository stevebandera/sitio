var Usuario = require('../modelos/usuario');

var logIn = function(req,res){
    var usuario;
    if(req.body.userLogIn.includes("'")||req.body.userLogIn.includes('"')||
        req.body.passwordLogIn.includes("'")||req.body.passwordLogIn.includes('"')){
        usuario = Usuario.find({user:"",
                                password:""});
    } else {
        usuario = Usuario.find({user:req.body.userLogIn,
                                password:req.body.passwordLogIn});
    }
    
    usuario.exec(function(err,respuesta){
        res.json(respuesta);
    });
}


var altaUsuario = function(req, res) {
    if (req.method == "POST") {
        var unaUsuario = new Usuario();
        unaUsuario.user = req.body.user;
        unaUsuario.password = req.body.password;
        unaUsuario.permisos = "all";

        var promise = unaUsuario.save();
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

module.exports = { logIn, altaUsuario };