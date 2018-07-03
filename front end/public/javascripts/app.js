var app = angular.module("miApp",['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/', {
		templateUrl:"vistas/inicio.html",
		controller : 'inicio'
	}).when('/bandera', {
		templateUrl:"vistas/bandera.html",
		controller : 'bandera'
	}).when('/inicio', {
		templateUrl:"vistas/inicio.html",
		controller : 'inicio'
	}).otherwise({
        redirectTo: "/"
    });
	$locationProvider.html5Mode(true);
});

app.factory('UserService', function($rootScope) {
	var permisos = "";

	var setPermisos = function(permiso){
		permisos = permiso;
		$rootScope.$broadcast('eventPermisos', permisos);
	}

	var getPermisos = function(){
		return permisos;
	}
  	return {
  		getPermisos : getPermisos,
  		setPermisos : setPermisos
	};
});
//banderahost
app.controller('inicio', function($scope,$http, $location, UserService){
	$scope.logIn = function(){
		var data = {
			userLogIn:$scope.userLogIn,
			passwordLogIn:$scope.passwordLogIn
		};
		console.log(data);

		$http.post("http://banderahost:8080/usuario/logIn",data).then(function(respuesta){
			console.log(respuesta);
			if(respuesta.data!=[]){
				UserService.setPermisos(respuesta.data[0]);
				$scope.permisos = respuesta.data[0].permisos;
				$scope.usuarioLoggeado = respuesta.data[0];
				$scope.sesionIniciada = true;
				$location.path("/bandera");
			} else {
				//usuario incorrecto
				alert("usuario incorrecto");
			}
		},function(error){
			console.log(error);
		});
	}
});

app.controller('bandera', function($scope,$http){
	var init = function(){
		$scope.parametroBanderaTresError = "bTresPrueba";
		$scope.banderaUnoDiv = true;
		$scope.banderaDosDiv = false;
		$scope.banderaTresDiv = false;
		$scope.banderaCuatroDiv = false;
		$scope.bUnoEstado = "active";
		$scope.bDosEstado = "";
		$scope.bTresEstado = "";
		$scope.bCuatroEstado = "";
		$scope.parametroBanderaUno = "";
		$scope.parametroBanderaDos = "";
		$scope.parametroBanderaTres = "";
		$scope.parametroBanderaCuatro = "";
	}

	var initClass = function(){
		$scope.bandClassUno = "is-invalid";
		$scope.bandClassDos = "is-invalid";
		$scope.bandClassTres = "is-invalid";
		$scope.bandClassCuatro = "is-invalid";
	}

	initClass();

	$scope.displayData = function(){
		$scope.dataParmDos = "ncu fqu rcncdtcu uqp ekhtcfq ecguct";
	}

	$scope.selectTab = function(value){
		$scope.banderaUnoDiv = false;
		$scope.banderaDosDiv = false;
		$scope.banderaTresDiv = false;
		$scope.banderaCuatroDiv = false;
		$scope.bUnoEstado = "";
		$scope.bDosEstado = "";
		$scope.bTresEstado = "";
		$scope.bCuatroEstado = "";
		switch(value) {
		    case 'b1':
		    		$scope.bUnoEstado = "active";
					$scope.banderaUnoDiv = true;
		        break;
		    case 'b2':
		    		$scope.bDosEstado = "active";
					$scope.banderaDosDiv = true;
		        break;
		    case 'b3':
		    		$scope.bTresEstado = "active";
					$scope.banderaTresDiv = true;
		        break;
		    case 'b4':
		    		$scope.bCuatroEstado = "active";
					$scope.banderaCuatroDiv = true;
		        break;
		}
	}

	$scope.ejecutarBandera = function(value){

		var data = {
			bandera:value
		};

		switch(value) {
		    case 'banderaUno':
		    		$scope.bandSolvUno = "";
					data.parametro = $scope.parametroBanderaUno;
					$scope.bandClassUno = "is-invalid";
		        break;
		    case 'banderaDos':
		    		$scope.bandSolvDos = "";
					data.parametro = $scope.parametroBanderaDos;
					$scope.bandClassDos = "is-invalid";
		        break;
		    case 'banderaTres':
		    		$scope.bandSolvTres = "";
					data.parametro = $scope.parametroBanderaTres;
					$scope.bandClassTres = "is-invalid";
		        break;
		    case 'banderaCuatro':
		    		$scope.bandSolvCuatro = "";
					data.parametro = $scope.parametroBanderaCuatro;
					$scope.bandClassCuatro = "is-invalid";
		        break;
		}
		

		$http.post("http://banderahost:8080/bandera/ejecutarBandera",data)
        .then(function(respuesta){
        	if(respuesta.data.length > 0){
        		switch(value) {
				    case 'banderaUno':
							$scope.bandSolvUno = respuesta.data[0].parmFinal;
							$scope.bandClassUno = "is-valid";
				        break;
				    case 'banderaDos':
							$scope.bandSolvDos = respuesta.data[0].parmFinal;
							$scope.bandClassDos = "is-valid";
				        break;
				    case 'banderaTres':
							$scope.bandSolvTres = respuesta.data[0].parmFinal;
							$scope.bandClassTres = "is-valid";
				        break;
				    case 'banderaCuatro':
							$scope.bandSolvCuatro = respuesta.data[0].parmFinal;
							$scope.bandClassCuatro = "is-valid";
				        break;
				}
				init();
            	console.log("OK");
        	} else {
        		console.log("ERROR");
        	}
        	
        },function(error){
            //Pasó algo
            console.log("Error:"+ error);
        });
	}

	$scope.ejecutarBanderaFinal = function(value){
		var data = {
			parmUno:$scope.bandSolvUno,
			parmDos:$scope.bandSolvDos,
			parmTres:$scope.bandSolvTres,
			parmCuatro:$scope.bandSolvCuatro
		};
		
		$http.post("http://banderahost:8080/bandera/ejecutarBanderaFinal",data)
        .then(function(respuesta){
        	if(respuesta.data.length > 0){
        		
            	console.log("OK");
        	} else {
        		console.log("ERROR");
        	}
        	
        },function(error){
            //Pasó algo
            console.log("Error:"+ error);
        });
	}
	
});