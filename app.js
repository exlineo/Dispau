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

app.controller('IHMAideCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMConnectionCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMProfilCtrl', ['$http', '$log', function($http, $log) {

}]);

// CONTROLER POUR LA CARTE DE FOND / GEREE AVEC NG-MAP


//app.controller('ANNAnnonceController', ['DBManager', ANNAnnonceController]);
//app.controller('ANNAnnonceListe', ['DBManager', ANNAnnonceListe]);
app.controller('MAPMapController', ['NgMap', 'DBManager', afficheMap]);
// app.controller('ANNCentreInteretListe', ['DBManager', ANNCentreInteretListe]);
// app.controller('CHAChatController', ['DBManager', CHAChatController]);
app.controller('LIELieuController', ['DBManager','$routeParams', LIELieuController]);
//app.controller('LIELieuListe', ['DBManager', LIELieuListe]);
// app.controller('USRDemandeAmiListe', ['DBManager', USRDemandeAmiListe]);
// app.controller('USRLogin', ['DBManager', USRLogin]);
//app.controller('USRUtilisateurController', ['DBManager', USRUtilisateurController]);
// app.controller('USRUtilisateurListe', ['DBManager', USRUtilisateurListe]);



/**
 * DECLARATION DES SERVICES (gestion BDD locale...)
 */

app.factory('IndexedDB', [IndexedDB]);
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManagerFactory]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', '$q', dbManagerFactory]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);


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
            .when('/aide', {
                templateUrl: 'views/tpl/aide.html',
                controller: 'IHMAideCtrl',
                controllerAs: 'vma'
            })

            .when('/connection', {
                templateUrl: 'views/tpl/connection.html',
                controller: 'IHMConnectionCtrl',
                controllerAs: 'vmc'
            })

            .when('/inscription', {
                templateUrl: 'views/tpl/inscription.html',
                controller: 'USRUtilisateurController',
                controllerAs: 'vm'
            })

            .when('/profil', {
                templateUrl: 'views/tpl/profil.html',
                controller: 'IHMProfilCtrl',
                controllerAs: 'vmp'
            })

            .when('/lieux/:idLieu', {                                // indique le path pour matcher l'url apres le '#'
                templateUrl : "views/tpl/lieu.html",            // fichier qui sera inclu dans le layout dans le 'ngview'
                controller : 'LIELieuController',                    // controlleur qui le gère
                controllerAs : 'myCtrl'
            })

            .when('/lieux/', {                            // indique le path pour matcher l'url apres le '#'
                templateUrl : "views/tpl/lieux.html",            // fichier qui sera inclu dans le layout dans le 'ngview'
                controller  : 'LIELieuListe',                          // controlleur qui le gère
                controllerAs : 'myCtrl'
            })

            /**
             * Action par défaut
             */

        .otherwise({
            .when('/chat/:idChat?', {
                templateUrl: 'views/tpl/chat.html',
                controller: 'CHAChatController',
                controllerAs: 'vm'
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


// paramètres du chat temporaire:

// CHAT: utilisateur identifié  // a mettre dans session

var fille = prompt('n° de la fille:');

var utilisateur_moi = {'id_nb' : fille, 'grade_nb' : 2};
