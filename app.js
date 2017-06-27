/**
 * DECLARATION DE L'APP ANGULAR
 */


var app = angular.module('dispau-app', [
    'ngRoute',
    'ngCookies'


    // AJOUTER VOS DEPENDANCES

    //'uiGmapgoogle-maps'
]);


/**
 * DECLARATION DES CONTROLLEURS
 */

//app.controller('MAPMap', ['uiGmapGoogleMapApi', '$scope', MAPMap]);
app.controller('ANNAnnonceListe', ['DBManager', 'Emetteur', '$routeParams', ANNAnnonceListe]);
app.controller('ANNAnnonceController', ['DBManager', '$routeParams', ANNAnnonceController]);
app.controller('ANNAnnonceAdd', ['DBManager', ANNAnnonceAdd]);


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
app.factory('Emetteur', ['$rootScope', Emetteur]);
app.factory('IndexedDB', [IndexedDB]);
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManagerFactory]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', '$q', dbManagerFactory]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);
app.factory('RegexService', [RegexService]);


/**
 * Specifique a la Google Maps
 */

/*app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBkm4blthirzCbZy1wy6GwUtxLC_jGW9rI&amp',
        //v: '3.25', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});*/


/**
 * DECLARATION DES ROUTES
 */

app.config(function ($routeProvider) {
    $routeProvider
        .when('/annonces/:idLieu', {
            templateUrl: 'views/annonces.html',
            controller: 'ANNAnnonceListe',
            controllerAs: 'vm'
        })

        .when('/annonces/:idLieu/:idAnnonce', {
            templateUrl: 'views/annoncesID.html',
            controller: 'ANNAnnonceController',
            controllerAs: 'vm'
        })

        .when('/ajouter-annonce/', {
            templateUrl: 'views/annonceAdd.html',
            controller: 'ANNAnnonceAdd',
            controllerAs: 'vm'
        })

        .otherwise({
            redirectTo: '/home'
        })
});