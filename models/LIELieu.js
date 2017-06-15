/**
 * Modèle de la classe Lieu
 * @constructor
 */

function LIELieu()
{

    /////// Propriétés ///////


    /**
     * Identifiant du lieu
     * @type {number}
     * @default 0
     */
    this.id_nb = 0;

    /**
     * Nom du lieu
     * @type {string}
     * @default ''
     */
    this.nom_str = '';

    /**
     * Description du lieu
     * @type {string}
     * @default ''
     */
    this.description_str = '';

    /**
     * Tableau d'annonces (1 lieu peut avoir plusieurs annonces)
     * @type {string[]}
     * @default []
     */
    this.annonces_ar = [];

    /**
     * Tableau de sous-lieux (1 lieu peut avoir plusieurs sous-lieux)
     * @type {string[]}
     * @default []
     */
    this.sousLieux_ar = [];

    /**
     * Tableau d'utilisateurs (1 lieu peut avoir plusieurs utilisateurs)
     * @type {number}
     * @default 0
     */
    this.utilisateurs_ar = []; // liste d'utilisateurs (id) par lieu

    /**
     * Adresse du lieu
     * @type {string}
     * @default ''
     */
    this.adresse_str = '';

    /**
     * Coordonnée horizontale
     * @type {number}
     * @default 0
     */
    this.latitude_nb = 0;

    /**
     * Coordonnée verticale
     * @type {number}
     * @default 0
     */
    this.longitude_nb = 0;


    /////// Propriétés instanciant des objets ///////


    /**
     * Instancie un nouvel administrateur pour le lieu
     * @type {object}
     * @default null
     */
    this.administrateur_adm = null;    //new Administrateur();

    /**
     * Instancie un nouveau chat pour le lieu
     * @type {object}
     * @default null
     */
    this.chat_cht = null;              //new Chat();

    /**
     * Instancie une nouvelle image pour le lieu
     * @type {object}
     * @default null
     */
    this.image_img = null;             //new Image();



    /////// Méthodes ///////



    /**
     * Permet d'hydrater les données de la classe Lieu lorsqu'une nouvelle instance est créée
     * @params {object} objet
     */
    this.hydrater = function (objet) {
        for (var key in objet)
            this[key] = objet[key];
    };

    /**
     * Renvoie l'identifiant du lieu
     * @returns {number}
     */
    this.getId = function () {
        return this.id_nb;
    };

    /**
     * Renvoie le nom du lieu
     * @returns {string}
     */
    this.getNom = function () {
        return this.nom_str;
    };

    /**
     * Renvoie le chat du lieu
     * @returns {object}
     */
    this.getChat = function () {
        return this.chat_cht;
    };

    /**
     * Renvoie l'image du lieu
     * @returns {Image}
     */
    this.getImage = function () {
        return this.image_img;
    };

    /**
     * Renvoie la description du lieu
     * @returns {string}
     */
    this.getDescription = function () {
        return this.description_str;
    };

    /**
     * Renvoie l'administrateur du lieu
     * @returns {USRAdministrateur[]}
     */
    this.getAdministrateur = function () {
        return this.administrateur_adm;
    };

    /**
     * Renvoie le tableau d'annonces correspondant au lieu
     * @returns {ANNAnnonce[]}
     */
    this.getAnnonces = function () {
        return this.annonces_ar;
    };

    /**
     * Renvoie toutes les annonces depuis la date choisie
     * @param  {Date} dateDebut Date choisie
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesDepuis = function (dateDebut) {
        return this.annonces_ar.filter(function (annonce) {
            return annonce.dateDebut_dat > dateDebut;
        });
    };

    /**
     * Renvoie toutes les annonces depuis la date choisie
     * @param {Date} dateDebut Date choisie
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesAvant = function (dateDebut) {
        return this.annonces_ar.filter(function (annonce) {
            return annonce.dateDebut_dat < dateDebut;
        });
    };

    /**
     * Renvoie les annonces dont la date a expirée
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesPassees = function (dateFin) {
        var annoncesFiltered = [];
        for (var i = 0; i < this.annonces_ar.length; i++) {
            if (this.annonces_ar.dateFin_dat > dateFin) {
                annoncesFiltered.push(this.annonces_ar);
            }
        }
        return annoncesFiltered;
    };

    /**
     * Renvoie les annonces comprises entre 2 dates fournies
     *
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesEnCours = function (dateDebut, dateFin) {
        var annoncesFiltered = [];
        for (var i = 0; i < this.annonces_ar.length; i++)
        {
            if (dateDebut < this.annonces_ar.dateFin_dat < dateFin)
                annoncesFiltered.push(this.annonces_ar);

        }
        return annoncesFiltered;
    };

    /**
     * Renvoie les annonces futures
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesFutures = function (dateDebut) {
        var annoncesFiltered = [];
        for (var i = 0; i < this.annonces_ar.length; i++)
        {
            if (this.annonces_ar.dateFin_dat < dateDebut)
                annoncesFiltered.push(this.annonces_ar);
        }
        return annoncesFiltered;
    };

    /**
     * Renvoie les annonces dont le nombre de participants est supérieure à la valeur fournie
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesAvecNbParticipantsSuperieurA = function (nb) {
        for (var i=0;i<this.annonces_ar.length;i++)
        {
            if (nb < this.annonces_ar[i].participants_ar.length)
                return this.annonces_ar[i];
        }
    };

    /**
     * Renvoie les annonces dont le nombre de participants est inférieure à la valeur fournie
     * @param {number} nb
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesAvecNbParticipantsInferieurA = function (nb) {
        for (var i=0;i<this.annonces_ar.length;i++)
        {
            if (this.annonces_ar[i].participants_ar.length < nb)
                return this.annonces_ar[i];
        }
    };

    /**
     * Renvoie les annonces qui correspondent aux centres d'interets fournis
     * @returns {ANNAnnonce[]}
     */
    this.getAnnoncesAvecCentresInterets = function (centresInterets) {
        for (var i=0;i<this.annonces_ar.length;i++)
        {
            for (var j=0;j<this.annonces_ar[i].centresInterets.length;j++)
            {
                if (this.annonces_ar[i].centresIntetets[j].nom_str == centreInteret)
                    return this.annonces_ar[i].centresIntetets[j].nom_str;
            }
        }
    };

    /**
     * Renvoie la liste des sous lieux
     * @returns {LIESousLieu[]}
     */
    this.getSousLieux = function () {
        return this.sousLieux_ar;
    };

    /**
     * Renvoie la liste des utilisateurs
     * @returns {USRUtilisateur[]}
     */
    this.getListeUtilisateurs = function () {
        return this.utilisateurs_ar;
    };

    /**
     * Renvoie l'adresse du lieu
     * @returns {string}
     */
    this.getAdresse = function () {
        return this.adresse_str;
    };

    /**
     * Renvoie la localisation du lieu à partir de la latitude et longitude
     * @param {number} lat Latitude du lieu
     * @param {number} long Longitude du lieu
     * @returns {Array}
     */
    this.getGeolocation = function (lat, long) {
        return [this.latitude_nb,this.longitude_nb];
    };

    /**
     * Renvoie Vrai ou Faux selon la position du lieu
     * @returns {boolean}
     */
    this.estProcheDe = function (lat,long) {

////////////// A CODER ////////////////
        return false;

    };

    /**
     * Met à jour l'identifiant du lieu
     * @param {number} id Identifiant du lieu
     */
    this.setId = function (id) {
        this.id_nb = id;
    };

    /**
     * Met à jour le nom du lieu
     * @param {string} nom Nom du lieu
     */
    this.setNom = function (nom) {
        this.nom_str = nom;
    };

    /**
     * Met à jour le chat
     * @param {CHAChat} chat Chat associé au lieu
     */
    this.setChat = function (chat) {
        this.chat_cht = chat;
    };

    /**
     * Met à jour l'image du lieu
     * @param {Image} image Image du lieu
     */
    this.setImage = function (image) {
        this.image_img = image;
    };

    /**
     * Met à jour la description du lieu
     * @param {string} description Description du lieu
     */
    this.setDescription = function (description) {
        this.description_str = description;
    };

    /**
     * Met à jour l'administrateur du lieu
     * @param {USRAdministrateur} administrateur Administrateur du lieu
     */
    this.setAdministrateur = function (administrateur) {
        this.administrateur_adm = administrateur;
    };

    /**
     * Met à jour les annonces du lieu
     * @param {ANNAnnonce[]} annonces Annonces associées au lieu
     */
    this.setAnnonces = function (annonces) {
        this.annonces_ar = annonces;
    };

    /**
     * Met à jour la liste des sous lieux
     * @param {LIESousLieu[]} sousLieux Liste des sous-lieux
     */
    this.setSousLieux = function (sousLieux) {
        this.sousLieux_ar = sousLieux;
    };

    /**
     * Met à jour l'adresse du lieu
     * @param {string} adresse Adresse du lieu
     */
    this.setAdresse = function (adresse) {
        this.adresse_str = adresse;
    };

    /**
     * Met à jour les coordonnées du lieu
     * @param {Array} geolocation Tableau avec la latitude,longitude du lieu
     */
    this.setGeolocation = function (geolocation) {
        this.latitude_nb = geolocation.latitude_nb;
        this.longitude_nb = geolocation.longitude_nb;
    };
}