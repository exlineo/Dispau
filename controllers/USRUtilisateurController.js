/**
 * Created by gaelph on 13/06/2017.
 */

/**
 *
 * @constructor
 */
function USRUtilisateurController () {

}

var app = angular.module('app', ['services', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('conneIntercepteur');

     $routeProvider
            .when('/accueil', {
                templateUrl: 'views/accueil.html',
                controller: 'accueilCtrl',
                controllerAs: 'vma'
            })
            .when('/annonces', {
                templateUrl: 'views/annonces.html',
                controller: 'AnnoncesCtrl',
                controllerAs: 'vman'
            })
            .when('/form', {
                templateUrl: 'views/formulaire.html',
                controller: 'connexionCtrl',
                controllerAs: 'vmc'
            })
            .otherwise({
                redirectTo: '/accueil'
            });

    $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

}]);


app.controller('accueilCtrl', ['$http', '$log', 'appelsHTTP', function($http, $log, appelsHTTP){

    var vma = this;
    var profils = appelsHTTP.getAnnonces().then(function(retour) {
        vma.donnees = retour.data.annonce1;
        //console.log(retour.data.annonce1);
    });

}]);