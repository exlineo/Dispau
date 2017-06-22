angular.module('dispauApp', [
    'ngRoute',
    'dispauApp.routing',
    'dispauApp.annonces',
    'dispauApp.AnnoncesServices'
])

    .controller('annoncesController', ['recupererAnnonces'], ANNAnnonceListe)

.config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo : '/home'
    })
});