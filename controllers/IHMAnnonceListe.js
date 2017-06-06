/**
 * TODO : Refaire IHM AnnonceListe qui permet d'aficher toute les annonces d'un lieu par exemple, AnnonceListeElement permet d'afficher qu'une annonce
 */

function IHMAnnonceListe() {
    /**
     * Variable possédant toutes les annonces
     * Il est intéressant de l'utiliser pour trier tous les objets
     * @type {{}}
     */
    var ici = this;
    var annonces_obj = {};
    this.annonces_ar = [];

    /**
     * Permet de créer un objet d'Annonce()
     * @param _annonce est un Objet d'annonce
     */
    this.ajouterAnnonce = function (_annonceObjet) {
        var keys = Object.keys(_annonceObjet);
        for (var i = 0; i < keys.length; i++) {
            var annonce = keys[i];
            var implAnnonce = new Annonce();
            implAnnonce.hydrate(_annonceObjet[annonce]);
            this.annonces_ar[i] = implAnnonce;
        }
    };

    /**
     * propriété qui permet de remplir la variable annonces_obj
     * @param liste_annonces_json est le fichier json récupéré depuis le model
     */
    this.hydrate = function (liste_annonces_json) {
        for (var i in liste_annonces_json) {
            var tmp = new Annonce();
            tmp.hydrate(liste_annonces_json[i]);
            annonces_obj[i] = tmp;
        }

    };

    /**
     * Permet de supprimer une annonce du tableau grâce à son ID
     * @param _id ID de l'annonce
     */
    this.supprimerAnnonceById = function(_id){
        for(var i =0; i < this.annonces_ar.length; i++) {
            if (this.annonces_ar[i].id_nb == _id) {
                delete this.annonces_ar[i]
            } else {
                console.log("L'annonce n'existe pas")
            }
        }
    }

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

//var json = $.getJSON("./annonces.json", function (data) {
//    annonceslistes_anl = new AnnoncesListe();
//    annoncesliste_anl.annoncesLieu(data);
//
//});
