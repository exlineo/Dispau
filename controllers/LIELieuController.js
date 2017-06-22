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
           ici.model = lieu;
        })
        .catch(function(error) {
            // TODO : GERER L'ERREUR
        });



    // faire un new Lieu et peupler la classe avec les données



    // utiliser angular pour afficher les données
}