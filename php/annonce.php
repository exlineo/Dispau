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

switch ($_GET['action']) {
    case "get" :
        echo selectAnnonce($_GET['id']);
        //selectAnnonce($_GET['id']);
        break;

    case "create" :
        break;

    case "update" :
        break;

    case "delete" :
        break;
}

/**
 * Permet de récupérer les annonces par rapport à l'ID
 * @param $id
 * @return array
 */
function selectAnnonce($id){
    $db = db();
    if ($id == null){
        $req = $db->prepare('SELECT * FROM annonce');
        $req->execute();
        $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
    }
    else{
        $req = $db->prepare('SELECT * FROM annonce WHERE id = :id');
        $req->execute(array(
            'id' => $_GET['id']
        ));
        $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
    }

    return json_encode($donnees);

    //return $donnees;
}

function insertAnnonce(){

}

function updateAnnonce(){

}

function deleteAnnonce(){

}
