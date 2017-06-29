/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function USRLogin () {
    // Properties
    /**
 * @param {DBManager} dbManager    Le service d'accès au serveur
 * @constructor
 */
function myController(dbManager) {
    var ici = this;
    /** 
     * Notre modèle de données, un instance de Annonce
     * @type {ANNAnnonce}
     * @default null
     */
    this.model = null;
    
    // Récupération de l'annonce avec l'identifiant 23
    var annonceManager = dbManager('Utilisateur');
    dbManager.get($_GET['id'])
        .then(function (annonce) {
            // utilisateur est une instance d'Utilisateur
            ici.model = utilisateur;
        })
        .catch(function (error) {
            // TODO: Gérer l'erreur
        })
}

}