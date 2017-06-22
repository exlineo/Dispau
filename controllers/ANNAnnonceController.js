/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function ANNAnnonceController (DBManager, $routeParams) {
    // Properties
    this.id = $routeParams.id;

    DBManager.get('ANNAnnonce', 1)
        .then(function (annonce) {
            console.log(annonce)
        })
        .catch(function (error) {
            console.log(error)
        })
}