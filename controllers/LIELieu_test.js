/**
 * Méthode permettant de tester l'affichage des annonces
 * @type {LIELieu}
 */

var jsonFile =
    [
        {
            "id_nb": 0,
            "nom_str": "Lieu1",
            "description_str": "Lieu sympa",
            "latitude_nb": "43.2736835",
            "longitude_nb": " -0.4856524",
            "chat_cht": 0,
            "image_img": "img/Lieu_0.jpg",

            "administrateur_adm": "Administrateur",
            "adresse_str": "3 Rue Inconnue, 64000 Pau",

            "sousLieux_ar":
                [
                    {
                        "id_nb": 0,
                        "nom_str": "SousLieu1",
                        "lieuParent_lie": "0"
                    },
                    {
                        "id_nb": 1,
                        "nom_str": "SousLieu2",
                        "lieuParent_lie": 0
                    }
                ],

            "annonces_ar":
                [
                    {
                        "id_nb": 0,
                        "nom_str": "toto",
                        "description_str": "Qui veut jouer à la belote ?",
                        "dateDebut_str": "17-04-2017:15.00",
                        "dateFin_str": "17-04-2017:17.00",
                        "dateCreattion_str" : "17-04-2017:17.00",
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
                    {
                        "id_nb": 1,
                        "nom_str": "Poker",
                        "description_str": "Qui veut jouer à la belote ?",
                        "dateDebut_str": "17-04-2017:15.00",
                        "dateFin_str": "17-04-2017:17.00",
                        "dateCreattion_str" : "17-04-2017:17.00",
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
                    {
                        "id_nb": 2,
                        "nom_str": "Rami",
                        "description_str": "Qui veut jouer au rami avec moi ?",
                        "dateDebut_str": "17-04-2017:15.00",
                        "dateFin_str": "17-04-2017:17.00",
                        "dateCreattion_str" : "17-04-2017:17.00",
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
                ]
        }
    ];

var monLieu = new LIELieu();
monLieu.hydrater(jsonFile);
console.log(monLieu);

