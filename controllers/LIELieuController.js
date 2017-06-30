/**
 * Created by gaelph on 13/06/2017.
 */

/**
 * @constructor
 */
function LIELieuController (DBManager) {

    // requetes ajax pour recup les données

    var ici = this;

    ici.model = [];


    var lieuManager = DBManager('LIELieu');


    /**
     * Récupération des arguments du GET
     */

    ici.action = $routeParams.action;
    ici.idLieu = $routeParams.idLieu;

console.log(ici.action);

    switch (ici.action)
    {
        case 'ajouter' :

            break;

        case 'editer' :

            break;

        case 'supprimer' :

            break;

        default :
            // Si l'id est vide, on affiche tous les lieux
            if (ici.idLieu === '')
            {
                lieuManager.all()
                    .then(function(lieu) {
                        console.log(lieu);
                        ici.model = lieu;
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("ERROR")
                    });
            }
            // Si l'id est défini, on affiche le lieu
            else
            {
                lieuManager.all()
                    .where('id_nb')
                    .equals(ici.idLieu)
                    .then(function(lieu) {
                        console.log(lieu);
                        ici.model = lieu;
                    })
                    .catch(function (error) {
                        console.log("Error :", error);
                    });
            }
            break;
    }


/*
    DBManager.get('LIELieu', $routeParams.idLieu)
        .then(function(lieu) {
            console.log("lieu recup : ", lieu);
            ici.model = lieu;
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la méthode get() de DBManager");
            console.log(error);
        });
*/


    // faire un new Lieu et peupler la classe avec les données

    // utiliser angular pour afficher les données
}