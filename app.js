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

app.controller('LIELieuController', ['DBManager','$routeParams', LIELieuController]);
app.controller('LIELieuListe', ['DBManager', LIELieuListe]);
/*
app.controller('ANNAnnonceController', ['DBManager', ANNAnnonceController]);
app.controller('ANNAnnonceListe', ['DBManager', ANNAnnonceListe]);
app.controller('ANNCentreInteretListe', ['DBManager', ANNCentreInteretListe]);
app.controller('CHAChatController', ['DBManager', CHAChatController]);
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
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', DBManager]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);
app.factory('RegexService', [RegexService]);


/**
 * Specifique a la Google Maps
 */
/*
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


// Controlleur pour la classe LIEU

app.config(['$routeProvider',function($routeProvider)
{
    $routeProvider
        .when('/lieux/:idLieu', {                                // indique le path pour matcher l'url apres le '#'
            templateUrl : "views/template_lieu.html",            // fichier qui sera inclu dans le layout dans le 'ngview'
            controller : 'LIELieuController',                    // controlleur qui le gère
            controllerAs : 'myCtrl'
        })

        .when('/lieux/', {                            // indique le path pour matcher l'url apres le '#'
            templateUrl : "views/template_lieux.html",            // fichier qui sera inclu dans le layout dans le 'ngview'
            controller  : 'LIELieuListe'                 // controlleur qui le gère
        })

        .otherwise({                                    // redirection en cas d'erreur
            redirectTo: '/home'                         // on renvoie vers le 'home'
        });
}]);