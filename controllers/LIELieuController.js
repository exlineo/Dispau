/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function LIELieuController (DBManager, $routeParams)
{
    var ici = this;

    this.model = null;

    DBManager.get('LIELieu', $routeParams.idLieu)
        .then(function(lieu)
        {
            ici.model = lieu;
        })
        .catch(function(error)
        {
            console.log("Erreur lors de l'appel de la méthode get() de DBManager");
            console.log(error);
        });
}