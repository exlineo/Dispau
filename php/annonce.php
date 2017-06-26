<?php
/**
 * ANNONCE.PHP
 *
 * Reçoit les requêtes AJAX depuis l'application AngularJS.
 * Traîte la requête HTTP.
 * Va chercher ou modifie les infos dans la base MySQL. (via connectDB.php).
 * Renvoie un résultat sous forme JSON à l'application AngularJS.
 *
 *  * Paramètres GET requis :
 * - action : 'get', 'id', 'create', 'update', 'delete'. Action CRUD
 */

/* Exemples:
 * Récupérer un annonce :
 * GET http://serveur/php/annonce.php?action=get&id=495039
 *
 * Récupére toutes les annonces d'un lieu :
 * GET http://serveur/php/annonce.php?action=get&lieu=49549
 *
 * Créer une annonce :
 * POST http://serveur/php/annonce.php?action=create
 *
 * Modifier une annonce :
 * POST http://serveur/php/annonce.php?action=update&id=495439
 *
 * Supprimer une annonce :
 * GET http://serveur/php/annonce.php?action=delete&id=43953429
 */

/* Méthodes à coder :
 *  - select()
 *  - insert()
 *  - update()
 *  - delete()
 *
 */

require_once 'connectDB.php';

// Exemple pour récupérer le PDO
$db = db();

/**
 * Permet de récupérer l'id de l'annonce
 */
if(isset($_GET['id']))
    $id = $_GET['id'];
else
    $id = null;

/**
 * Permet de récupérer l'action
 */
$action = $_GET['action'];

/**
 * Switch les $_GET afin de lancer les bonnes fonctions
 */
switch ($action) {
    case "get" :
        echo selectAnnonce($db, $id);
        break;

    case "delete" :
        echo "YO";
        deleteAnnonce($db, $id);
        break;
}



/**
 * Permet de récupérer les annonces par rapport à l'ID
 * @param $id de l'annonce
 * @return array d'annonce
 */
function selectAnnonce($db, $id){
    try {
        if (!isset($id)){
            $req = $db->prepare("SELECT * FROM `annonce`");
            $req->execute();
            $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
        }

        else{
            $req = $db->prepare("SELECT * FROM `annonce` WHERE id_nb = :id_nb");
            $req->execute(array(
                'id_nb' => $id
            ));
            $donnees = $req->fetch(PDO::FETCH_ASSOC);
        }

        return json_encode($donnees);
    } catch (Exception $e) {
        echo 'ERROR: '. $e->getMessage();
    }


    //return $donnees;
}

function insertAnnonce(){

}

function updateAnnonce($db){

    $req = $db->prepare();
}

function deleteAnnonce($db, $id){
    try{
        $req = $db->prepare("DELETE FROM `annonce` WHERE id_nb = :id_nb");
        $req->execute(array(
            'id_nb' => $id
        ));
    } catch (Exception $e){
        echo 'ERROR: '. $e->getMessage();
    }
}
