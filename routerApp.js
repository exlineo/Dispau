angular.module('dispauApp.routing', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/annonces/', {
                templateUrl: 'views/annonces.html',
                controller: 'annoncesController'
            })

            .when('/annonces/:id', {
                templateUrl: 'views/annoncesID.html',
                controller: 'annoncesIDController'
            })
    });