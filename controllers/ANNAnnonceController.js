/**
 * Controlleur pour une annonce
 * @param {dbManagerFactory} DBManager Fabrique de gestionnaire d'entités
 * @param {$routeParams} $routeParams Service de paramètres de route
 * @constructor
 */
function ANNAnnonceController (DBManager, $routeParams) {
    /**
     * Réference locale
     * @type {ANNAnnonceController}
     * @private
     */
    var vm = this;

    /**
     * Gestionnaire d'entités
     * @type {DBManager}
     * @private
     */
    var annonceManager = DBManager('ANNAnnonce');

    /**
     * Identifiant de l'annonce
     * @type {number}
     */
    this.id = $routeParams.id;

    /**
     * L'annonce contrôlée
     * @type {ANNAnnonce|null}
     */
    this.model = null;

    // Récupération de l'annonce
    annonceManager.get(vm.id)
        .then(function (annonce) {
            console.log(annonce);
            vm.model = annonce;
        })
        .catch(function (error) {
            console.log(error);
            console.log("ERROR")
        });

    /**
     * Enregistre une annonce, la met à jour si elle existe
     * @param {object} donnees
     */
    this.enregistrerAnnonce = function (donnees) {
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

    /**
     * Supprime une annocne
     * @param {number} annonceId
     */
    this.supprimerAnnonce = function (annonceId) {
        if (confirm('Voulez-vous supprimer cette annonce ?')) {
            annonceManager.delete(annonceId)
                .then(function (annonceId) {

                })
                .catch(function (error) {

                });
        }
    };
}