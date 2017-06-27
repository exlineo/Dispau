/**
 * Classe qui permet d'afficher un lieu par rapport à un ID
 * @param DBManager     Gestion de la BD
 * @param $routeParams  Gestion des paramètres dans les routes
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
    this.id = $routeParams.idAnnonce;

    /**
     * Action de l'annonce
     * @type {string}
     */
    this.action = $routeParams.action;

    console.log(this.action);

    /**
     * L'annonce contrôlée
     * @type {ANNAnnonce|null}
     */
    this.model = null;

    var test = false;

    //Si la route n'est pas défini, affiche les informations de l'annonce
    if (typeof(vm.action) === 'undefined'){

        /**
         * Permet d'afficher l'annnonce par rapport à son id
         */
        annonceManager.get(vm.id)
            .then(function (annonce) {
                console.log(annonce);
                vm.model = annonce;

                if (test) {
                    annonceManager.save(annonce)
                        .then(function (annonce) {
                            console.log("UPDATED", annonce);
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
    }

    else{
        switch (vm.action){
            case 'edit' :

            break;

            case 'ajouter' :

            break;

            case 'supprimer':

            break;
        }
        /**
         * Enregistre une annonce, la met à jour si elle existe
         * @param {object} donnees
         */
        this.enregistrerAnnonce = function () {
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

        vm.ajouterCentreDInterets= function () {
            console.log();
            vm.annonce.centreDInteret.push(vm.interet_str);
        }
    }


}