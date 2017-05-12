function LIELieu () {
    // Propriétés
    this.id_nb = 0;
    this.nom_str = '';
    this.description_str = '';
    this.annonces_ar = [];
    this.sousLieux_ar = [];
    this.utilisateurs = []; // liste d'utilisateurs par lieu
    this.adresse_str = '';
    this.latitude_nb = 0;
    this.longitude_nb = 0;

    // Propriétés instanciant des objets
    this.administrateur_adm = null;    //new Administrateur();
    this.chat_cht = null;              //new Chat();
    this.image_img = null;             //new Image();

    // Fonctions
    this.hydrater = function (objet) {
        for (var key in objet)
            this[key] = objet[key];
    };

    /**
     *
     * @returns {number}
     */
    this.getId = function () {
        return this.id_nb;
    };

    /**
     *
     * @returns {string}
     */
    this.getNom = function () {
        return this.nom_str;
    };

    /**
     *
     * @returns {string}
     */
    this.getChat = function () {
        return this.description_str;
    };

    /**
     *
     * @returns {Array}
     */
    this.getImage = function () {
        return this.annonces_ar;
    };

    /**
     *
     * @returns {string}
     */
    this.getDescription = function () {
        return this.description_str;
    };

    /**
     *
     * @returns {Administrateur}
     */
    this.getAdministrateur = function () {
        return this.administrateur_adm;
    };

    /**
     *
     * @returns {Array}
     */
    this.getAnnonces = function () {
        return this.annonces_ar;
    };

    /**
     *
     */
    this.getAnnoncesDepuis = function () {
    };

    /**
     *
     * @param dateDebut
     * @returns {Array.<*>}
     */
    this.getAnnoncesAvant = function (dateDebut) {
        return this.annonces_ar.filter(function (annonce) {
            return annonce.dateDebut_dat < dateDebut;
        });
    };

    /**
     *
     * @param dateFin
     * @returns {Array}
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
     *
     * @param dateDebut
     * @param dateFin
     * @returns {Array}
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
     *
     * @param dateDebut
     * @returns {Array}
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
     *
     */
    this.getAnnoncesAvecNbParticipantsSuperieurA = function (nb) {
        for (var i=0;i<this.annonces_ar.length;i++)
        {
            if (nb < this.annonces_ar[i].participants_ar.length)
                return this.annonces_ar[i];
        }
    };

    /**
     *
     */
    this.getAnnoncesAvecNbParticipantsInferieurA = function (nb) {
        for (var i=0;i<this.annonces_ar.length;i++)
        {
            if (this.annonces_ar[i].participants_ar.length < nb)
                return this.annonces_ar[i];
        }
    };

    /**
     *
     * @param centresInterets
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
     *
     * @returns {number}
     */
    this.getSousLieux = function () {
        return this.id_nb;
    };

    /**
     *
     * @returns {number}
     */
    this.getAdresse = function () {
        return this.id_nb;
    };

    /**
     *
     * @param lat
     * @param long
     * @returns {number}
     */
    this.getGeolocation = function (lat, long) {
        return this.id_nb;
    };

    /**
     *
     * @returns {number}
     */
    this.estProcheDe = function () {
        return this.id_nb;
    };

    /**
     *
     * @param id
     */
    this.setId = function (id) {
        this.id_nb = id;
    };

    /**
     *
     * @param nom
     */
    this.setNom = function (nom) {
        this.nom_str = nom;
    };

    /**
     *
     * @param chat
     */
    this.setChat = function (chat) {
        this.chat_cht = chat;
    };

    /**
     *
     * @param image
     */
    this.setImage = function (image) {
        this.image_img = image;
    };

    /**
     *
     * @param description
     */
    this.setDescription = function (description) {
        this.description_str = description;
    };

    /**
     *
     * @param administrateur
     */
    this.setAdministrateur = function (administrateur) {
        this.administrateur_adm = administrateur;
    };

    /**
     *
     * @param annonces
     */
    this.setAnnonces = function (annonces) {
        this.annonces_ar = annonces;
    };

    /**
     *
     * @param sousLieux
     */
    this.setSousLieux = function (sousLieux) {
        this.sousLieux_ar = sousLieux;
    };

    /**
     *
     * @param adresse
     */
    this.setAdresse = function (adresse) {
        this.adresse_str = adresse;
    };

    /**
     *
     * @param geolocation
     */
    this.setGeolocation = function (geolocation) {
        this.latitude_nb = geolocation.latitude_nb;
        this.longitude_nb = geolocation.longitude_nb;
    };
}