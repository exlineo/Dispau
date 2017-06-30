<?php
/**
 * UTILISATEUR.PHP
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
 * Récupérer un utilisateur :
 * GET http://serveur/php/utilisateur.php?action=get&id=495039
 *
 * Récupére toutes les utilisateurs d'un lieu :
 * GET http://serveur/php/utilisateur.php?action=get&lieu=49549
 *
 * Créer une utilisateur :
 * POST http://serveur/php/utilisateur.php?action=create
 *
 * Modifier une utilisateur :
 * POST http://serveur/php/utilisateur.php?action=update&id=495439
 *
 * Supprimer une utilisateur :
 * GET http://serveur/php/utilisateur.php?action=delete&id=43953429
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
 * Permet de récupérer l'action
 */
$action = $_GET['action'];
/**
 * Permet de récupérer l'id de l'utilisateur
 */
if (isset($_GET['id']))
    $id = $_GET['id'];
else
    $id = null;
if (isset($_GET['where']))
    $where = $_GET['where'];
else
    $where = false;

switch ($action) {
    case "get" :
        if(!$id){
            header('Content-Type: application/json;charset=utf8;');
            echo getUtilisateurs($db);
        }
        else if (!$where) {
            header('Content-Type: application/json;charset=utf8;');
            echo getUtilisateur($db, $id);
        } 
        else {
            header('Content-Type: application/json;charset=utf8;');
            echo getUtilisateur($db, $id, $where);
        }
        break;
    case "create" :
        $data = json_decode(file_get_contents("php://input"), true);
        echo insertUtilisateur($db, $data);
        break;
    case "update" :
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['id'])) {
            echo updateUtilisateur($db, $id, $data);
        }
        break;
    case "delete" :
        echo deleteUtilisateur($id);
        break;
}

function getUtilisateurs($db)
{
    try
    {
        $stmt = $db->prepare("SELECT * FROM `utilisateur`");
        $stmt->execute();
        $data = $stmt->fetchAll();
        header('Content-Type: application/json;charset=utf8;');
        return json_encode($data);
    }
    catch(Exception $e)
    {
        exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
    }
}

function getUtilisateur($db)
{
    try
    {
        $stmt = $db->prepare("SELECT * FROM `utilisateur` WHERE `id_nb`= :id");
        $stmt->execute(['id' => $_GET['id']]);
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            header('Content-Type: application/json;charset=utf8;');
            return json_encode($data);
        }   
    }
    catch(Exception $e)
    {
        exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
    }
}
