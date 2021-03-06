/**
 * Classe Annonce permet de créer des annonces
 * @constructor
 */
function ANNAnnonce() {
    //var notice = new Notification();
    var ici = this;

    /**
     * ID de l'annonce
     */
    this.id_nb;

    /**
     * Nom de l'annonce
     */
    this.nom_str;

    /**
     * Image de l'annonce
     */
    this.image_img = '';

    /**
     * Description de l'annonce
     */
    this.description_str;

    /**
     * Nombre de personnes maximum
     */
    this.personnesMax_nb;

    /**
     * Nombre de personnes minimum
     */
    this.personnesMin_nb;

    /*nombre de personnes minimum*/
    this.participants_ar = [];

    /*tableau de id users, liste des participants à l'annonce*/
    this.salleDAttente_ar = [];

    /*tableau de Id users, liste des participants en liste d'attente par ordre de priorité*/
    this.personnesBannies_ar = [];

    /*tableau de Id d'users; liste des participants bannis*/
    this.idLieu_nb;

    /*Id clé) du Lieu auquel est attaché l'annonce. */
    this.dateDebut_dat = +new Date();

    /*Date   limite pour les inscriptions */
    this.dateFin_dat = +new Date();

    /*date  du début de l'activité de cette annonce*/
    this.dateFinInscriptions_dat = +new Date();

    /*date  de la fin de l'activité*/
    this.dateCreation_dat = +new Date();

    /*date de creation de l'annonde. Se met automatiquement*/
    this.idGestionnaire_nb = 1;

    /* id du gestionnaire */
    this.validite_bl = true;

    /*booleen annonce validee=true*/
    this.annulee_bl;

    /**
     * Limite de l'âge pour l'annonce
     */
    this.limiteAge_nb;

    this.idChat_nb = 1;

    this.centresDInterets_ar = [];
    /*Liste des centres d'interets auquels se rapporte cette annonce.¨Pour cibler les éventuels "clients"*/

    this.validite_nb;

    this.salleDeTchat_nb;
    /* Salle de tchat specifisue pour cette activité */

    this.hydrater = function (obj) {
        for (var i in obj) {
            ici[i] = obj[i];
        }
    };
    /* traite les demandes d'inscription ajoute l'utilisateur dans le tableau des inscrits, vérifie si il peut être inscrit,
     le met en liste d'attente si le nombre max est atteint
     @param {number} utilisateur : objet utilisateur
     @returns 1 si inscription, 2 si liste d'attente
     @returns {erreur}

     1002 si l'utilisateur est bloqué
     1004 si la date d'inscription est depassee
     1005 si l'utilisateur n'a pas l'age requis
     1006 si l'utilisateur est déjà inscrit
     1007 si l'utilisateur est déjà en liste d'attente
     1008 si l'annonce est annulée
     1009 si l'annonce n'est pas validée
     @author Francis Thomas le 9 Avril 2017*/

    this.inscrireUser = function (utilisateur) {
        var resultat;
        var idUser = utilisateur.id_nb;
        /* le test sur l'age requiert la classe utilisateur la ligne suivante est provisoire */
        if (utilisateur.age_nb < ici.limiteAge_nb) {
            //notice.appel(1005); //vous n'avez pas l'âge requis
            return 'erreur';
        }

        if (!ici.validite_bl)/* test si l'annonce n'est pas validée*/
        {
            // annonce non validée
            //notice.appel(1009);
            return 'erreur';
        }

        if (ici.annulee_bl) /* test si l'annonce est annulée */
        {

            //notice.appel(1008); //annonce annulée
            return 'erreur';
        }

        if (ici.personnesBannies_ar.indexOf(idUser) >= 0) /* test si l'utilisateur est bloqué */
        {
            //notice.appel(1002); //utilisateur bloqué'
            return 'erreur';
        }

        if (Date.now() > ici.dateFinInscriptions_dat.getTime())/* test si la date d'inscription est dépassée */
        {
            //notice.appel(1004); //date inscription dépassée
            return 'erreur';
        }

        if (ici.personnesBannies_ar.indexOf(idUser) >= 0) /* test si l'utilisateur est bloqué */
        {
            Notification.call(this, 1002); //utilisateur bloqué'
            return 'erreur';
        }

        if (ici.personnesInscrites_ar.indexOf(idUser) >= 0)/* test si la personne est déjà inscrite */
        {
            //notice.appel(1006); //utilisateur deja inscrit
            return 'erreur';
        }

        if (ici.salleDAttente_ar.indexOf(idUser) >= 0) /* test si la personne est déjà en liste d'attente */
        {
            //notice.appel(1007); //utilisateur deja inscrit en liste d'attente
            return 'erreur';
        }
        if (ici.personnesInscrites_ar.length < ici.personnesMax_nb) /*si il reste au moins une place */
        {
            ici.personnesInscrites_ar.push(idUser);
            return 1;
        }
        else {
            ici.salleDAttente_ar.push(idUser)
            //notice.appel(1003); //utilisateur mis en liste d'attente
            return 2;
        }
    };//fin de la methode inscrireUser


    /*Annulation de l'annonce
     mets le booleen annulee_bl à true
     @returns erreur 1010 si l'annonce est déjà annulée
     @author Francis Thomas le 9 Avril 2017*/


    this.annuler = function () {
        if (ici.annulee_bl == true) {
            //notice.appel(1001); //annonce déjà annulée
            return 'erreur';
        }
        else {
            ici.annulee_bl = true;
            return true;
        }
    }// fin de la méthode annuler

    this.modifierNom = function (nom_str) {
        if (nom_str == '') {
            //notice.appel(1010); //le nom entré est vide
            return 'erreur';
        }
        else {
            ici.annulee_bl = true;
            return true;
        }
    }// fin de la méthode modifierNom


    /*Modifie le nom d'une annonce
     avec des parametres entres par celui qui modifie.
     @param  {string}  	nom 			nom de l'annonce à changer
     return true si ça s'est bien passe
     false si le nom de l'annonce n'est pas correct*/

    /*Modifie la photo d'une annonce
     avec des parametres entres par celui qui modifie.
     @param  {string}  	photo 			nom du fichier dela photo jpg
     return true si ça s'est bien passe*/

    this.modifierPhoto = function (photo_str) {
        if (photo_str == '') {

            //notice.appel(1012); //le nom de fichier photo entre est nul
            return 'erreur';
        }
        else {
            ici.nom_str = nom_str;
            return true;
        }
    }

    /*Modifie la description d'une annonce
     avec des parametres entres par celui qui modifie.
     @param  {string}  	description chaîne contenant la description
     return true si ça s'est bien passe*/
    this.modifierDescription = function (description_str) {
        if (description_str == '') {
            //notice.appel(1013); //le nom  entre est vide
            return 'erreur';
        }
        else {
            ici.description_str = description_str;
            return true;
        }

    }; //Fin méthode modifierDescription

    this.modifierLieu = function (idLieu_nb) {
        if (idLieu_nb == ici.idLieu_nb) {
            //notice.appel(1014); //le meme lieu a ete entre\'
            return 'erreur';
        }

        else {
            ici.idLieu_nb = idLieu_nb;
            return idLieu_nb;
        }
    }


    /* Modifie le nombre de personnes max et min admises dans une annonce
     retire les derniers inscrits (par date d'inscription) éventuellement et les met en liste d'attente
     @param {number}		personnesMax 	nombre max de personnes admises est -1 si pas de modif
     @param {number}		personnesMin 	nombre min de personnes admises est -1 si pas de modif
     @returns {objet} 	type :  false si on a mis des personnes en liste d'attente
     true si on a viide une partie de la liste d'attente pour les mettre dans les inscrits
     liste : tableau des utilisateurs transferes, que type soit vrai ou faux
     */
    this.modifierNbPersonnes = function (personnesMax_nb, personnesMin_nb) {
        var resultat = {
            type: true,
            liste: []
        }

        if ((personnesMin_nb != -1 && personnesMax_nb != -1) && personnesMin_nb > personnesMax_nb) {
            //.appel(1015); //max inferieur à min'
            return 'erreur';

        }

        if (personnesMin_nb != -1) // si personneMin changé
        {
            if ((personnesMin_nb > ici.personnesMax_nb) && (personnesMax_nb == -1)) {
                //notice.appel(1015); //max inferieur à min'
                return 'erreur';
            }
            ici.personnesMin_nb = personnesMin_nb;
        }
        if (personnesMax_nb != -1) {
            var difference = personnesMax_nb - ici.personnesMax_nb; // difference entre exixtant et entree

            if ((ici.personnesMin_nb > personnesMax_nb) && (personnesMin_nb == -1)) {
                //notice.appel(1015); //max inferieur à min'
                return 'erreur';
            }

            ici.personnesMax_nb = personnesMax_nb;

        }

        if (ici.personnesInscrites_ar.length > personnesMax_nb) // gestion de la salle d'attente si on diminue le nombre max
        {
            var tailleOrigine_nb = ici.personnesInscrites_ar.length; // stocke le nombre initial de personnes inscrites


            for (i = tailleOrigine_nb; i > personnesMax_nb; i--) {
                var sorti = ici.personnesInscrites_ar.pop() // dernier inscrit a mettre an liste d'attente
                ici.salleDAttente_ar.unshift(sorti) // le premier élément a la plus haute priorité
                resultat.liste.unshift(sorti) // retour des personnes mises en salle d'attente dans l'ordre de priorité
                resultat.type = false;
            }
        }
        if ((ici.personnesInscrites_ar.length < personnesMax_nb) && ici.salleDAttente_ar.length != 0)
        // si on augmente le nombre max et la salle d'attente n'est pas vide
        {
            var minimum = Math.min(difference, ici.salleDAttente_ar.length)
            for (var i = 0; i < minimum; i++) {
                var entre = ici.salleDAttente_ar.shift();
                ici.personnesInscrites_ar.push(entre);
                resultat.type = true;
                resultat.liste.push(entre);
            }
        }
        return resultat;
    };

    // fin de la methode modifierNbPersonnes

    /* Modifie l'age limite d'inscription
     retire les inscrits trop jeunes
     @param {number}		age 			age limite en années
     @returns {array of numbers} 	liste des personnes sorties
     */
    this.modifierAgeLimite = function (age_nb) {
        var resultat = [];
        var newtab = [];
        var newattente = [];

        if (age_nb > ici.limiteAge_nb) {
            ici.limiteAge = age_nb;
            return resultat;
        }
        else {

            for (var i = 0; i < ici.personnesInscrites_ar.length; i++) {
                if (age(ici.personnesInscrites_ar[i]) < age_nb) {
                    resultat.push(ici.personnesInscrites_ar[i]);
                }
                else {

                    newtab.push(ici.personnesInscrites_ar[i]);
                }
            } // fin du for sur personnes inscrites

            for (var j = 0; j < ici.salleDAttente_ar.length; j++) {
                if (age(ici.salleDAttente_ar[j]) < age_nb) {
                    resultat.push(ici.salleDAttente_ar[j]);
                }
                else {
                    if (newtab.length < ici.personnesMax_nb) {
                        newtab.push(ici.salleDAttente_ar[j]);
                    }
                    else {
                        newattente.push(ici.salleDAttente_ar[j]);
                    }

                }
            }	//fin du for sur la salle d'attente

            ici.personnesInscrites_ar = newtab;
            ici.salleDAttente_ar = newattente;
            return resultat;

        } // fin du else


        /***************************************************************************************************************************/
    }


    /* Modifie les dates de début, de fin et de limite d'inscription controle si la date de debut est bien posterieure à now()
     @param 		{date} 			dateDebut
     @param 		{date} 			dateFin
     @returns	{array of number} 	tableau contenant la liste des identifiants des personnes mises en liste d'attente
     */
    this.modifierDates = function (dateDebut_dat, dateFin_dat) {
        if (dateDebut_dat.valueOf() > datefin_dat.valueOf()) {
            Notification.call(this, 1018); //date de début avant date de fin
            return 'erreur';
        }
        if (dateDebut_dat.valueof() < now()) {
            Notification.call(this, 1019); //date d'inscription est depassee
            return 'erreur';
        }
        ici.dateFin_dat = dateFin_dat;
        ici.dateDebut_dat = dateDebut_dat;
    }
    /* envoyer une notification à tous les utilisateurs inscrits*/


    /*************************************************************************************************
     pas fini */


    /* Modifie les dates de début, de fin et de limite d'inscription controle si la date de debut est bien posterieure à now()
     @param 		{date} 			dateDebut
     @param 		{date} 			dateFin
     @returns	{array of number} 	tableau contenant la liste des identifiants des personnes mises en liste d'attente
     */
    this.modifierDates = function (dateDebut_dat, dateFin_dat) {
        if (dateDebut_dat.valueOf() > datefin_dat.valueOf()) {
            //notice.appel(1018); //date de début avant date de fin
            return 'erreur';
        }
        if (dateDebut_dat.valueof() < now()) {
            //notice.appel(1019); //date d'inscription est depassee
            return 'erreur';
        }
        ici.dateFin_dat = dateFin_dat;
        ici.dateDebut_dat = dateDebut_dat;
    }
    /* envoyer une notification à tous les utilisateurs inscrits*/


    /* Ajoute un centre d'interet relatif à cette annonce
     @param 	 {number} 	idCentre  identifiant du centre d'interet
     @returns false si le centre d'interet existait deja. true sinon.
     */
    this.ajouterCentreDInteret = function (idCentre) {
        ici.centresDInterets_ar.push(idCentre);
    }


    /* Bloque ou debloque un utilisateur de cette annonce
     @param 		{number} 	idUser 	identifiant de l'utilisateur à bloquer ou debloquer
     @param 		{boolean}	action 	true si bloquer, false si debloquer
     @returns 	{boolean}	false si l'état de blocage était le même pour cet utilisateur. true sinon
     */
    this.bloquer = function (idUser, action) {
        var indexDansInscrit = ici.personnesInscrites_ar.indexOf(idUser);
        var indexDansAttente = ici.salleDAttente_ar.indexOf(idUser);
        if (action) {
            ici.personnesBannies_ar.push(idUser);
            if (indexDansAttente >= 0) {
                ici.salleDAttente_ar.split(indexDansAttente, 1) //retire l'user bloqué de la salle d'attente
            }
            if (indexDansInscrit >= 0) {
                ici.personnesInscrites_ar.split(indexDansInscrit, 1);
                if (ici.salleDAttente_ar.legth > 0);
                ici.personnesInscrites_ar.push(ici.salleDAttente_ar.shift());
            }
        }
    };

    /* Modifie les dates de début, de fin et de limite d'inscription controle si la date de debut est bien posterieure à now()
     @param 		{date} 			dateDebut				date de debut  mettre -1 si inchangé
     @param 		{date} 			dateFin 				date de fin  mettre -1 si inchangé
     @param 		{date} 			dateFinInscriptions		date limite d'inscription  mettre -1 si inchangé
     @returns	{array of number} 	tableau contenant la liste des identifiants des personnes mises en liste d'attente
     */
    /*this.modifierDateInscription=function(dateFinInscriptions_dat)
     {
     if (dateDebut_dat.valueof()<now())
     {
     notice.appel(1019); //date d'inscription est depassee
     return 'erreur';
     }
     else
     {
     ici.dateFinInscriptions_dat=dateFinInscriptions_dat;
     return true;
     }
     else {
     var indexDansBannis = ici.personnesBannies_ar.indexOf(idUser);
     ici.personnesBannies_ar.split(indexDansBannis, 1);

     }
     }*/


    /*valide ou invalide l'annonce
     @param 		{boolean}  	action  true pour valider false pour invalider
     @returns 	{boolean}	false si la validité était dans l'état demandé
     */
    this.valider = function (action) {
        if (action == ici.validite_bl) {
            Notification.call(this, 1020); //annonce dejà validée
            return 'erreur';
        }
        else {
            ici.validite_bl = action;
        }
    }

    /*supprime un utilisateur
     l'utilisateur est retiré de la liste personnesIscrites_ar OU de la liste d'attente
     si retrait de la liste users, ET liste d'attente non vide, alors transferer de la liste d'attente vers les users inscrits
     @param 	{number} 	idUser identifiant de l'utilisateur à supprimer
     @returns {utilisateur} 	utilisateur sorti de la liste d'attente
     */
    this.supprimerUser = function (idUser) {
        var indexDansInscrit = ici.personnesInscrites_ar.indexOf(idUser);
        var indexDansAttente = ici.salleDAttente_ar.indexOf(idUser);

        if (indexDansAttente >= 0) {
            ici.salleDAttente_ar.split(indexDansAttente, 1) //retire l'user bloqué de la salle d'attente
        }
        if (indexDansInscrit >= 0) {
            ici.personnesInscrites_ar.split(indexDansInscrit, 1);
            if (ici.salleDAttente_ar.legth > 0);
            ici.personnesInscrites_ar.push(ici.salleDAttente_ar.shift());

        }
    };


    /*valide ou invalide l'annonce
     @param 		{boolean}  	action  true pour valider false pour invalider
     @returns 	{boolean}	false si la validité était dans l'état demandé
     */
    this.valider = function (action) {
        if (action == ici.validite_bl) {
            //notice.appel(1020); //annonce dejà validée
            return 'erreur';
        }
        else {
            ici.validite_bl = action;
        }
    };


    /*cette fonction permet d'envoyer une notification aux utilisateurs connectes dans le lieuet non inscrits à l'annonce.
     declenché soit spontanement (criteres à definir) soit par l'organisateur de l'annonce
     */
    this.envoyerNotification = function () {
        /***********************************************************************/
        // envoyer notification
    };

// si le centre d'interet entré en paramètre concorde avec un de ceux de la liste, il renvoie true
    this.trieCentreInteret = function (centreinteret) {
        if (ici.centresInterets_ar.length == 0) {
            return true;
        }
        return ici.centresInterets_ar.indexOf(centreinteret) >= 0;
    };


    /*cette fonction permet d'envoyer une notification aux utilisateurs connectes dans le lieu et non inscrits à l'annonce
     declenché soit spontanement (toutes les n millisecondes si le nombre minimum n'est pas atteint) soit par l'organisateur de l'annonce
     envoyé aux utilisateurs présents dans le lieu, qui ne sont pas inscrits à l'annonce.
     */

    this.envoyerNotification = function () {
        /***********************************************************************/
        // envoyer notification
// tableau contenant les utilisateurs du lieu à récupérer avec la fonction getUtilisateursLieu
        notification() //pour appel volontaire du createur aux utilisateurs non inscrits
        notification = function () {
            //mettre ici une fonction qui va recupérer un tableau d'utilisateurs du lieu parent supérieur
            //envoyer une notification "il y a encore des places pour this au lieu ici.lieu_nb" a tous les utilisateurs du tableau ci dessus
        }
//répétition de la notification automatiquement

        var tropTard = setInterval(function () {
            var intervalle = 3600000; //par defaut, notifiction toutes les heures (avant trois heures)
            var tempsrestantheure = (ici.dateFinInscriptions_dat.valueof() - now()) / intervalle; //temps restant avant la date limite d'inscription

            notification() //envoyer la notification à intervalles réguliers

            if (tempsrestantheure < 3) //trois heures avant notification toutes les demi heures
            {
                intervalle = intervalle / 2;
            }
            if (tempsrestantheure < 1) //une heure avant toutes les dix minutes
            {
                intervalle = intervalle / 3
            }
        }, intervalle);

        if (tempsrestantheure <= 0) {
        }


    }
    /* Fin de la definition de la classe annonce*/

}
