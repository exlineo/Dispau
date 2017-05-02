function AnnonceListe() {
    /**
     * Variable possédant toutes les annonces
     * Il est intéressant de l'utiliser pour trier tout les objets
     * @type {{}}
     */
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
            this.tmp = new Annonce();
            tmp.hydrate(data[i]);
            annonces_obj[i] = tmp;
        }

    };
    /*this.annoncesLieu = function (_lieu) {
     var lieu = _lieu.lieu_lie;
     this.annonces_ar[lieu];
     console.log("Annonces du lieu", this.annonces_ar);
     };*/

    /**
     * Permet de supprimer une annonce par rapport à l'ID de l'annonce
     * @param _annonceID est l'ID de l'annonce
     */
    this.supprimerAnnonce = function (_annonceID) {
        if (_annonceID in this.annonces_ar) {
            delete this.annonces_ar[_annonceID];
            console.log("Annonces", this.annonces_ar);
            console.log("Done")
        }

        else console.log("L'annonce n'existe pas")
    };

    this.afficherLesAnnonces = function () {
        for (var i in this.annonces_ar) {
            var annonces = this.annonces_ar[i];
            console.log("afficherLesAnnonces ", annonces)

        }
    }

    /*this.afficherAnnonce = function (_annonceID) {
     if(_annonceID in this.annonces_ar){
     console.log(this.annonces_ar[_annonceID]);
     }

     else console.log("L'annonce n'existe pas")
     }*/


// en paramètre, il y aura un centre d'interet
// et dans la variable, il y aura la liste des annonces possédants les annonces possédant ce centre d'interet
    this.annoncesCentresInterets = function (centreinteret) {
        var annonceQuiMatch = {};
        for (var i in annonces_obj) {
            for (var j in i) {
                if(j.trieCentreInteret(centreinteret)) {
                    annonceQuiMatch.push(i);
                }
            }
        }

    }
}
/* Fin de la definition de la classe annonce_Liste*/

var annonce1 = {
    'id_nb': 1,
    'nom_str': 'Belote',
    'description_str': 'Qui veut jouer à la belote ?',
    'dateDebut_str': '17-04-2017:15.00',
    'dateFin_str': '17-04-2017:17.00',
    'dateCreattion_str': '17-04-2017:17.00',
    'lieu_lie': 'N°5',
    'centresInterets_ar': ['belote', 'tarot', 'poker', 'apéro'],
    'placesMin_nb': 4,
    'placesMax_nb': 4,
    'image_Img': 'images/belote.jpg',
    'participants_ar': [],
    'salleAttente_ar': [],
    'banis_ar': [],
    'validee_bl': false
};

var annonce2 = {
    'id_nb': 2,
    'nom_str': 'Poker',
    'description_str': 'Qui veut jouer au Poker ?',
    'dateDebut_str': '17-04-2017:15.00',
    'dateFin_str': '17-04-2017:17.00',
    'dateCreattion_str': '17-04-2017:17.00',
    'lieu_lie': 'N°5',
    'centresInterets_ar': ['belote', 'tarot', 'poker', 'apéro'],
    'placesMin_nb': 4,
    'placesMax_nb': 8,
    'image_Img': 'images/poker.jpg',
    'participants_ar': [],
    'salleAttente_ar': [],
    'banis_ar': [],
    'validee_bl': false
};

var annonce3 = {
    'id_nb': 3,
    'nom_str': 'Rami',
    'description_str': 'Qui veut jouer au rami avec moi ?',
    'dateDebut_str': '17-04-2017:15.00',
    'dateFin_str': '17-04-2017:17.00',
    'dateCreattion_str': '17-04-2017:17.00',
    'lieu_lie': 'Café du passage',
    'centresInterets_ar': ['belote', 'tarot', 'poker', 'rami', 'apéro'],
    'placesMin_nb': 3,
    'placesMax_nb': 5,
    'image_Img': 'images/rami.jpg',
    'participants_ar': [],
    'salleAttente_ar': [],
    'banis_ar': [],
    'validee_bl': false
};


var json = $.getJSON("./annonces.json", function (data) {
    annonceslistes_anl = new AnnoncesListe();
    annoncesliste_anl.annoncesLieu(data);

});

var testAnnonce = {
    "annonce1": {
        "id_nb": 1,
        "nom_str": "toto",
        "description_str": "Qui veut jouer à la belote ?",
        "dateDebut_str": "17-04-2017:15.00",
        "dateFin_str": "17-04-2017:17.00",
        "dateCreattion_str": "17-04-2017:17.00",
        "lieu_lie": "N°5",
        "centresInterets_ar": ["belote", "tarot", "poker", "apéro"],
        "placesMin_nb": 4,
        "placesMax_nb": 4,
        "image_Img": "./images/belote.jpg",
        "participants_ar": [],
        "salleAttente_ar": [],
        "banis_ar": [],
        "validee_bl": false
    },
    "annonce2": {
        "id_nb": 2,
        "nom_str": "Poker",
        "description_str": "Qui veut jouer à la belote ?",
        "dateDebut_str": "17-04-2017:15.00",
        "dateFin_str": "17-04-2017:17.00",
        "dateCreattion_str": "17-04-2017:17.00",
        "lieu_lie": "N°5",
        "centresInterets_ar": ["belote", "tarot", "poker", "apéro"],
        "placesMin_nb": 4,
        "placesMax_nb": 8,
        "image_Img": "./images/poker.jpg",
        "participants_ar": [],
        "salleAttente_ar": [],
        "banis_ar": [],
        "validee_bl": false
    },
    "annonce3": {
        "id_nb": 3,
        "nom_str": "Rami",
        "description_str": "Qui veut jouer au rami avec moi ?",
        "dateDebut_str": "17-04-2017:15.00",
        "dateFin_str": "17-04-2017:17.00",
        "dateCreattion_str": "17-04-2017:17.00",
        "lieu_lie": "Café du passage",
        "centresInterets_ar": ["belote", "tarot", "poker", "rami", "apéro"],
        "placesMin_nb": 3,
        "placesMax_nb": 5,
        "image_Img": "./images/rami.jpg",
        "participants_ar": [],
        "salleAttente_ar": [],
        "banis_ar": [],
        "validee_bl": false
    }
}
