/**
 * DECLARATION DE L'APP ANGULAR
 */


var app = angular.module('dispau-app', [
    'ngRoute',
    'ngCookies',
    'ngMap'
    // AJOUTER VOS DEPENDANCES

    //'uiGmapgoogle-maps'
]);


/**
 * DECLARATION DES CONTROLLEURS
 */

//app.controller('MAPMap', ['uiGmapGoogleMapApi', '$scope', MAPMap]);


// Les controlleurs suivants DOIVENT ETRE vérifiés ET adaptés aux templates HTML

app.controller('IHMAccueilCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMListeCtrl', ['$http', '$log', function($http, $log) {

}]);

var pau = {
    latitude: 43.296371,
    longitude: -0.370091
};


// CONTROLER POUR LA CARTE DE FOND / GEREE AVEC NG-MAP
app.controller('MAPMapController', ['NgMap', afficheMap]);
/*
app.controller('ANNAnnonceController', ['DBManager', ANNAnnonceController]);
app.controller('ANNAnnonceListe', ['DBManager', ANNAnnonceListe]);
app.controller('ANNAnnonceController', ['DBManager', '$routeParams', ANNAnnonceController]);


// Les controlleurs suivants DOIVENT ETRE vérifiés ET adaptés aux templates HTML

/*
app.controller('ANNCentreInteretListe', ['DBManager', ANNCentreInteretListe]);
app.controller('CHAChatController', ['DBManager', CHAChatController]);
app.controller('LIELieuController', ['DBManager', LIELieuController]);
app.controller('LIELieuListe', ['DBManager', LIELieuListe]);
app.controller('USRDemandeAmiListe', ['DBManager', USRDemandeAmiListe]);
app.controller('USRLogin', ['DBManager', USRLogin]);
app.controller('USRUtilisateurController', ['DBManager', USRUtilisateurController]);
app.controller('USRUtilisateurListe', ['DBManager', USRUtilisateurListe]);
*/


/**
 * DECLARATION DES SERVICES (gestion BDD locale...)
 */

app.factory('IndexedDB', [IndexedDB]);
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManager]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', '$q', DBManager]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);
app.factory('RegexService', [RegexService]);


/**
 * Specifique a la Google Maps


app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBkm4blthirzCbZy1wy6GwUtxLC_jGW9rI&amp',
        //v: '3.25', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
*/

/**
 * DECLARATION DES ROUTES
 */

app.config(function ($routeProvider) {
    $routeProvider
        .when('/annonces/', {
            templateUrl: 'views/annonces.html',
            controller: 'ANNAnnonceListe',
            controllerAs: 'vm'
        })

        .when('/annonces/:id', {
            templateUrl: 'views/annoncesID.html',
            controller: 'ANNAnnonceController',
            controllerAs: 'vm'
        })

        .otherwise({
            redirectTo: '/home'
        })
});

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
            .when('/accueil', {
                templateUrl: 'views/tpl/acceuil.html',
                controller: 'IHMAccueilCtrl',
                controllerAs: 'vma'
            })

            .when('/liste', {
                templateUrl: 'views/tpl/liste.html',
                controller: 'IHMListeCtrl',
                controllerAs: 'vml'
            })

            .otherwise({
                redirectTo: '/'
            });

    $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

    //$httpProvider.interceptors.push('conneIntercepteur');

}]);