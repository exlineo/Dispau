/**
 * DECLARATION DE L'APP ANGULAR
 */


var app = angular.module('dispau-app', [
    'ngRoute',
    'ngCookies',

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

// app.controller('USRUtilisateurController', ['DBManager', '$http', '$log', function(DBManager, $http, $log) {
        
// }]);

app.controller('USRUtilisateurController', ['DBManager', USRUtilisateurController]);


/*
app.controller('ANNAnnonceController', ['DBManager', ANNAnnonceController]);
app.controller('ANNAnnonceListe', ['DBManager', ANNAnnonceListe]);
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
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManagerFactory]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', '$q', dbManagerFactory]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);
//app.factory('RegexService', [RegexService]);

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
                controller: 'listeCtrl',
                controllerAs: 'vml'
            }) 

            .when('/profil', {
                templateUrl: 'views/tpl/profil.html',
                controller: 'USRUtilisateurController',
                controllerAs: 'vmu'
            }) 

            .otherwise({
                redirectTo: '/accueil'
            });

    $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

    //$httpProvider.interceptors.push('conneIntercepteur');

}]);