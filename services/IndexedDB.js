/**
 * METTRE A JOUR PAR RAPPORT A BDD
 * RENOMMER DEXIE EN INDEXEDDB
 */

/**
 * Service pour le wrapper IndexedDB.js
 * @return {IndexedDB}
 */
function IndexedDB() {

    /**
     * Liste des stores
     * Represente la base de données au format Dexie, avec les tables
     * ATTENTION : il est possible d'utiliser l'* pour caractériser un tableau de clé (utile ???)
     */
    var databaseDeclarations = {

        0: {
            "annonce":    "++id, nom_str, image_str, dateCreation_date, dateFinInscription_date, dateFin_date, dateDebut_date, idLieu_nb, placeMin_nb, placeMax_nb, idGestionnaire_nb, idChat_nb, salleDAttente_ar, participant_ar, centreInteret_ar, validite_nb",

            "centreDInteret":  "++id, nom_str",

            "lieu": "++id, demandeur_nb, cible_nb, dateDemande_dat",

            "demandeAmi": "++id, nom_str, idChat_nb, longitude_nb, latitude_nb, annonce_ar, sousLieu_ar, utilisateur_ar, adresse_str, description_str, image_str, idAdmin_nb",

            "message": "++id, idChat_nb, date_date, banni_nb, contenu_str, idExpediteur_nb",

            "sousLieu": "++id, nom_str, lieuParent_nb, lieuPrincipal_nb, sousLieu_ar",

            "utilisateur": "++id, pseudo_str, prenom_str, pass_str, email_str, description_str, nom_str, dateInscription_date, abonnementLieu_ar, notificationRecue_ar, demandeAmi_ar, ami_ar, annonceParticipee_ar, grade_nb, photoProfil_str"

        }
    };

    // chargement de la base de données
    var db = new Dexie("Dispau_db");

    // Chargement itératif des stores

    db.version(7).stores(databaseDeclarations[7]);

    console.log("Loaded db version " + 7);

    // On renvoie l'instance de Dexie.
    return db;
}