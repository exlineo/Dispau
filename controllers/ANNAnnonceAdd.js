
function ANNAnnonceAdd(DBManager){
    var vm = this;
    vm.annonce = {
        "centreDInteret" : []
    };

    /**
     * Gestionnaire d'entités
     * @type {DBManager}
     * @private
     */
    var annonceManager = DBManager('ANNAnnonce');

    vm.enregistrerAnnonce = function () {
        console.log(vm.annonce);
        // Hydratation de l'instance à envoyer
        var annonce = new ANNAnnonce();
        annonce.hydrater(vm.annonce);

        // Envoi de la requête d'insertion
        annonceManager.save(annonce)
            .then(function (annonceEnregistree) {
                // TODO: traîtement à l'ajout
            })
            .catch(function (error) {
                // TODO: traîter l'erreur
            })
        vm.annonce = {};
    };
    
    vm.ajouterCentreDInterets= function () {
        console.log();
        vm.annonce.centreDInteret.push(vm.interet_str);
    }
}