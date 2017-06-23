/**
 * Classe qui permet d'afficher un lieu par rapport à un ID
 * @param DBManager     Gestion de la BD
 * @param $routeParams  Gestion des paramètres dans les routes
 * @constructor
 */
function ANNAnnonceController (DBManager, $routeParams) {
    //Récupère l'id dans la route
    this.id = $routeParams.idAnnonce

    var vm = this;
    this.model = null;

    /**
     * Permet de récupérer une annonce par rapport à son ID
     */
    DBManager.get('ANNAnnonce', vm.id)
        .then(function (annonce) {
            console.log(annonce);
            vm.model = annonce;
        })
        .catch(function (error) {
            console.log(error);
            console.log("ERROR")
        })
}