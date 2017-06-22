/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function LIELieuController (DBManager, $routeParams)
{
    var ici = this;

    /**
     * Notre modèle de données, un instance de Lieu
     * @type {LIELieu}
     * @default null
     */
    this.model = null;
    // requetes ajax pour recup les données

    DBManager.get('LIELieu', $routeParams.idLieu)
        .then(function(lieu) {
            console.log("lieu recup : ", lieu);
            ici.model = lieu;
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la méthode get() de DBManager");
            console.log(error);
        });



    // faire un new Lieu et peupler la classe avec les données



    // utiliser angular pour afficher les données
}