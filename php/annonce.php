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

function selectAnnonce($id){
    $db = db();
    $req = $db->prepare('SELECT * FROM annonce WHERE id = ?');
    
}

function insertAnnonce(){

}

function updateAnnonce(){

}

function deleteAnnonce(){

}
