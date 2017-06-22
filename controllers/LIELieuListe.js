/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function LIELieuListe () {

    var ici = this;

    this.model = [];

    DBManager.all('LIELieu')
        .then(function(lieux)
        {
            ici.model = lieux;
        })
        .catch(function(error)
        {
            console.log("Erreur lors de l'appel de la méthode get() de DBManager");
            console.log(error);
        });
}