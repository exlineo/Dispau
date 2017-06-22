/**
 * @constructor
 */
function ANNAnnonceController (DBManager, $routeParams) {
    // Properties
    this.id = $routeParams.id;

    var vm = this;
    this.model = null;

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