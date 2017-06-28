/**
 * Created by gaelph on 13/06/2017.
 */

/**
 *
 * @constructor
 */
// function USRUtilisateurController () {

// }

// app.controller('USRUtilisateurController', ['DBManager', '$http', '$log', function($http, $log, DBManager){

//     var vmu = this;
//     var profils = DBManager.getUtilisateurs().then(function(retour) {
//         //vma.donnees = retour.data.annonce1;
//         console.log(retour);
//     });

//     vmu.pseudo_str = "Profil pseudo";

//     console.log("USRUtilisateurController");

// }]);


/**
* @param {DBManager} dbManager  Le service d'accès au serveur
* @constructor
*/
function USRUtilisateurController (dbManager) {
	console.log("hello USRUtilisateurController");
    var vmu = this;
    /**
     * Notre modèle de données des instances de USRUtilisateur
     * @type {USRUtilisateur[]}
     * @default []
     */
    this.model = [];
    
    // Récupération de TOUS les utilisateurs
    var utilisateursManager = dbManager('USRUtilisateur');
    utilisateursManager.all()
        .then(function (utilisateurs) {
            // utilisateurs est un tableau contenant
            // des instances de USRUtilisateur
            vmu.model = utilisateurs;
            console.log(vmu.model);
            console.log(vmu.model[1].prenom_str);

            vmu.image_img = vmu.model[1].image_img[0];
            vmu.prenom_str = vmu.model[1].prenom_str;
            vmu.nom_str = vmu.model[1].nom_str;
        })
        .catch(function (error) {
            // TODO: Gére l''erreur
        })
}







