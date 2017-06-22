/**
 * Created by gaelph on 13/06/2017.
 */

/**
 *
 * @constructor
 */
// function USRUtilisateurController () {

// }

app.controller('USRUtilisateurController', ['$http', '$log', function($http, $log){

    var vmu = this;
    // var profils = appelsHTTP.getAnnonces().then(function(retour) {
    //     vma.donnees = retour.data.annonce1;
    //     //console.log(retour.data.annonce1);
    // });

    vmu.pseudo_str = "Profil pseudo";

    //console.log("USRUtilisateurController");
    $log.log("USRUtilisateurController");

}]);