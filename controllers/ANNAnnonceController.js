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
        .where('id_nb').equals(1)
        .limit(5)
        .then(function (annonces) {
            console.log(annonces[0]);
            vm.model = annonces[0];

            var annonceToSave = annonces[0];
            annonceToSave.id_nb = -1;
            annonceToSave.modifierNom('nom à enregistrer');

            dbManager.save(annonceToSave)
                .then(function (annonceSaved) {
                    vm.model = annonceSaved;
                })
                .catch(function (error) {
                    console.error(error);
                });
        })
        .catch(function (error) {
            console.log(error);
            console.log("ERROR")
        });
}