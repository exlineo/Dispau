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

    /**
     * ID du lieu
     * @type {number}
     */
    this.idLieu = $routeParams.idLieu;

    /**
     * Permet d'afficher le détail de l'annonce
     * @type {boolean}
     */
    this.showAnnonce = true;

    /**
     * Permet d'afficher la div d'édition
     * @type {boolean}
     */
    this.showEdit = false;

    /**
     * Permet d'afficher la div d'édition
     * @type {boolean}
     */
    this.showAdd = false;

    /**
     * L'annonce contrôlée
     * @type {ANNAnnonce|null}
     */
    this.annonce = null;
    
    /**
     * Permet d'afficher le formulaire et d'ajouter une annonce
     */
    if (vm.id === "ajouter"){
        //Affiche la div add
        vm.showAdd = true;
        //Masque le détail de l'annonce
        vm.showAnnonce = false;

        /**
         * Enregistre une annonce, la met à jour si elle existe
         * @param {object} annonce
         */
        this.enregistrerAnnonce = function () {
            console.log(vm.annonce);
            // Hydratation de l'instance à envoyer
            var annonce = new ANNAnnonce();
            annonce.hydrater(vm.annonce);

            // Envoi de la requête d'insertion
            annonceManager.save(annonce)
                .then(function (annonceEnregistree) {
                    //console.log("Annonce Enregistrée", annonceEnregistree)
                })
                .catch(function (error) {
                    // TODO: traîter l'erreur
                });

            //Vide l'object une fois insérer
            vm.annonce = {};
        };
    }

    switch (vm.action){
        case 'edit' :
            //Permet d'afficher la div edit
            vm.showEdit = true;
            //Masque le détail de l'annonce
            vm.showAnnonce = false;
            break;

        case 'supprimer':
            /**
             * Supprime une annocne
             * @param {number} id annonce
             */
            if (confirm('Voulez-vous supprimer cette annonce ?')) {
                annonceManager.delete(vm.id)
                    .then(function (annonceId) {

                    })
                    .catch(function (error) {

                    });
            }
            break;
        default :
            /**
             * Permet d'afficher l'annnonce par rapport à son id
             */
            annonceManager.all()
                .where('id_nb')
                .equals(vm.id)
                .and('idLieu_nb')
                .equals(vm.idLieu)
                .then(function (annonce) {
                    //console.log(annonce[0].dateCreation_dat);
                    //console.log(formatDate(annonce[0].dateCreation_dat))
                    vm.annonce = annonce;
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("ERROR")
                });
    }


    vm.ajouterCentreDInterets = function () {
        console.log();
        vm.annonce.centreDInteret.push(vm.interet_str);
    }
}