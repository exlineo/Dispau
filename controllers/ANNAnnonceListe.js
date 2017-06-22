/**
 * AnnonceListe est une classe qui permet de créer un tableau d'annonce d'un lieu
 * @constructor
 */
function ANNAnnonceListe(DBManager) {
    /**
     * Variable possédant toutes les annonces
     * Il est intéressant de l'utiliser pour trier tous les objets
     * @type {{}}
     */
    var ici = this;
    this.annonces_ar = [];

    DBManager.all('ANNAnnonce')
        .then(function (annonces) {
            console.log(annonces);
        })
        .catch(function (error) {
            console.log(error)
        });

    /**
     * propriété qui permet de remplir la variable annonces_obj
     * @param liste_annonces_json est le fichier json récupéré depuis le model
     */
    this.ajouterAnnonce = function (listeAnnonce_obj) {
        for (var i in listeAnnonce_obj) {
            var implAnnonce = new Annonce();
            implAnnonce.hydrate(listeAnnonce_obj);
            this.annonces_ar[i] = implAnnonce;
        }
        console.log(this.annonces_ar);
    };

    /**
     * Permet de supprimer une annonce du tableau grâce à son ID
     * @param _id ID de l'annonce
     */
    this.supprimerAnnonceById = function(id_nb){
        for(var i =0; i < this.annonces_ar.length; i++) {
            if (this.annonces_ar[i].id_nb == id_nb) {
                delete this.annonces_ar[i]
            } else {
                console.log("L'annonce n'existe pas")
            }
        }
    };

    /**
     * Permet de vider le tableau d'annonces
     */
    this.clearAllAnnonce = function (){
        this.annonces_ar = [];
    };

// en paramètre, il y aura un centre d'interet
// et dans la variable, il y aura la liste des annonces possédants les annonces possédant ce centre d'interet
    this.annoncesCentresInterets = function (centreinteret) {
        var annonceQuiMatch = [];
        for (var i in ici.annonces_ar) {
            if (ici.annonces_ar[i].trieCentreInteret(centreinteret) || typeof(centreinteret) === 'undefined') {
                annonceQuiMatch.push(ici.annonces_ar[i]);
            }
        }
        return annonceQuiMatch;
    }
}
/* Fin de la definition de la classe annonce_Liste*/