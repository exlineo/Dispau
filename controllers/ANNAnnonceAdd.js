
function ANNAnnonceAdd(DBManager){
    var vm = this;
    this.annonce = {};

    /**
     * Gestionnaire d'entités
     * @type {DBManager}
     * @private
     */
    var annonceManager = DBManager('ANNAnnonce');

    this.enregistrerAnnonce = function (donnees) {
        console.log(donnees)
        // Hydratation de l'instance à envoyer
        var annonce = new ANNAnnonce();
        annonce.hydrater(donnees);

        // Envoi de la requête d'insertion
        annonceManager.save(annonce)
            .then(function (annonceEnregistree) {
                // TODO: traîtement à l'ajout
            })
            .catch(function (error) {
                // TODO: traîter l'erreur
            });
    };
}