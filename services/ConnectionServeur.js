/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function ConnectionServeur () {
    // Properties

}

var services = angular.module('services', []);	

services.factory('appelsHTTP', ['$http','$log', function($http,$log) {

    var appelsHTTP = {};

    appelsHTTP.getAnnonces = function() {

        return $http.get('models/annonces.json')
                    .then(
                        function (response) {
                            $log.log('OK chargement : ');
                            $log.log(response);
                            return response;
                        },
                        function (response) {
                            $log.log('Echec chargement : ' + response);
                        }
                    );
                     
    }

    // Appel de connexion
    appelsHTTP.getID = function(obj) {
            return $http.post("models/php/connexion.php", obj).then(function(rep) {
                console.log(rep.data);
                return rep;
            }, function(rep) {
                return null;
            });
    }

    return appelsHTTP;

}]);