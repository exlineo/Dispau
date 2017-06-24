/**
 * @constructor
 */
function ANNAnnonceController (DBManager, $routeParams) {
    // Properties
    this.id = $routeParams.id;

    var vm = this;
    this.model = null;

    var dbManager = DBManager('ANNAnnonce');

    dbManager.all()
        .where('id_nb').equals(5)
        .limit(5)
        .then(function (annonces) {
            console.log(annonces[0]);
            vm.model = annonces[0];
        })
        .catch(function (error) {
            console.log(error);
            console.log("ERROR")
        })
}