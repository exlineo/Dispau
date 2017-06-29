/**
 * Created by gaelph on 13/06/2017.
 */

/**
 *
 * @param DBManager     Gestion de la BD
 * @constructor
 */
function USRUtilisateurController (DBManager) {
    /**
     * Réference locale
     * @type {USRUtilisateurController}
     * @private
     */
    var vm = this;

    /**
     * Creation d'un profil vide
     * @type {}
     */
    vm.profil = {};

    /**
     * Gestionnaire d'entités
     * @type {DBManager}
     * @private
     */
    var utilisateurManager = DBManager('USRUtilisateur');

    /**
     * Enregistre un profil utilisateur
     * @param {object} donnees
     */
    this.enregistrerUtilisateur = function () {
        console.log(vm.utilisateur);

        // Hydratation de l'instance à envoyer
        var utilisateur = new USRUtilisateur();
        utilisateur.hydrater(vm.profil);
        
        // TODO: voir ce qui lie Profil et USRUtilisateur
        
        // Envoi de la requête d'insertion
        utilisateurManager.save(utilisateur)
            .then(function (utilisateurEnregistree) {
                    // TODO: traîtement à l'ajout
                    console.log(utilisateurEnregistree);
            })
            .catch(function (error) {
                    // TODO: traîter l'erreur
                    console.log(error);
            });
    };
}