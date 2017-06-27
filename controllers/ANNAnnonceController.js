/**
 * Classe qui permet d'afficher un lieu par rapport à un ID
 * @param DBManager     Gestion de la BD
 * @param {Emetteur}    Emetteur
 * @param $routeParams  Gestion des paramètres dans les routes
 * @constructor
 */
function ANNAnnonceController (DBManager, Emetteur, $routeParams) {
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
    this.id = $routeParams.idAnnonce;

    /**
     * L'annonce contrôlée
     * @type {ANNAnnonce|null}
     */
    this.model = null;

    var test = true;

    // Récupération de l'annonce
    annonceManager.get(vm.id)
        .where('idChat_nb').equals(15)
        .and('banni_nb').equals(0)
        .orderBy('time', 'desc')
        .limit(5)
        .then(function (annonce) {
            console.log(annonce);
            vm.model = annonce;

            if (test) {
                annonceManager.save(annonce)
                    .then(function (annonce) {
                        console.log("UPDATED", annonce);
                        Emetteur.emettre('annonce:updated', annonce);
                    })
                    .catch(function (error) {
                        console.log("ERROR UPDATIN' : ", error);
                    });
            }
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