angular.module('dispauApp.AnnoncesServices', [])
    .factory('recupererAnnonces', function ($http) {
        return {
            getAnnonces : function () {
                return $http({
                    method : 'GET',
                    url : './php/annonce.php',
                    data : {
                        'action' : 'get'
                    }
                })
            }
        }
    });