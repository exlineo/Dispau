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
app.controller('ANNAnnonceListe', ['DBManager', '$routeParams', ANNAnnonceListe]);
app.controller('ANNAnnonceController', ['DBManager', '$routeParams', ANNAnnonceController]);


// Les controlleurs suivants DOIVENT ETRE vérifiés ET adaptés aux templates HTML

app.controller('IHMAideCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMConnectionCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMInscriptionCtrl', ['$http', '$log', function($http, $log) {

}]);

app.controller('IHMProfilCtrl', ['$http', '$log', function($http, $log) {

}]);

// CONTROLER POUR LA CARTE DE FOND / GEREE AVEC NG-MAP
app.controller('carteClr', ['NgMap', function(NgMap) {

    var vmm = this;

    NgMap.getMap('dispauCarte').then(function(map) {
        vmm.map = map;

        vmm.map.onClick = function() {
            alert('Carte cliquée');
        }
    });

    vmm.positions1 = [
        { pos: [40.11, -0.21], name: 1 }, { pos: [40.22, -0.10], name: 2 },
        { pos: [40.33, -0.99], name: 3 }, { pos: [40.44, -0.88], name: 4 },
        { pos: [40.55, -0.77], name: 5 }, { pos: [40.66, -0.66], name: 6 }
    ];

    vmm.positions2 = [
        { pos: [40.71, -0.21], name: 1 }, { pos: [40.72, -0.20], name: 2 },
        { pos: [40.73, -0.19], name: 3 }, { pos: [40.74, -0.18], name: 4 },
        { pos: [40.75, -0.17], name: 5 }, { pos: [40.76, -0.16], name: 6 }
    ];

    vmm.setPositions = function(pos) {
        vmm.positions = angular.copy(pos);
    };

    vmm.setPositions(vmm.positions1);
    vmm.currentIndex = 0;
    vmm.selectNextCustomMarker = function() {
        /* vmm.map.customMarkers[vmm.currentIndex].removeClass('selected');
        vmm.currentIndex = (vmm.currentIndex + 1) % vmm.positions.length;
        vmm.map.customMarkers[vmm.currentIndex].addClass('selected');
        vmm.currentPosition = vmm.positions[vmm.currentIndex];
        */
    }

}]);
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
 

app.factory('IndexedDB', [IndexedDB]);
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManager]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'IndexedDBManager', 'AjaxService', 'RequestQueue', DBManager]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);
app.factory('RegexService', [RegexService]);
*/

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

            .when('/annonces/:idLieu/:idAnnonce/:action', {
                templateUrl: 'views/annoncesID.html',
                controller: 'ANNAnnonceController',
                controllerAs: 'vm'
            })

            .when('/inscription', {
                templateUrl: 'views/tpl/inscription.html',
                controller: 'IHMInscriptionCtrl',
                controllerAs: 'vmi'
            }) 

            .when('/profil', {
                templateUrl: 'views/tpl/profil.html',
                controller: 'IHMProfilCtrl',
                controllerAs: 'vmp'
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