<?php
/**
 * LIEU.PHP
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
 * Récupérer un lieu :
 * GET http://serveur/php/lieu.php?action=get&id=495039
 *
 * Récupére toutes les lieus d'un lieu :
 * GET http://serveur/php/lieu.php?action=get&lieu=49549
 *
 * Créer une lieu :
 * POST http://serveur/php/lieu.php?action=create
 *
 * Modifier une lieu :
 * POST http://serveur/php/lieu.php?action=update&id=495439
 *
 * Supprimer une lieu :
 * GET http://serveur/php/lieu.php?action=delete&id=43953429
 */

/* Méthodes à coder :
 *  - select()
 *  - insert()
 *  - update()
 *  - delete()
 */

require_once 'connectDB.php';

// Exemple pour récupérer le PDO
$db = db();

getLieux($db);


function getLieu($db)
{
    try
    {
        $stmt = $db->prepare("SELECT * FROM `lieu` WHERE `id_nb`= :id");
        $stmt->execute(['id' => $_GET['id']]);

        while ($data = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            header('Content-Type: application/json;charset=utf8;');
            echo json_encode($data);
        }
    }
    catch(Exception $e)
    {
        exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
    }
}

function getLieux($db)
{
    try
    {

        $stmt = $db->prepare("SELECT lieu.*, annonce.id_nb as nb_annonces FROM lieu LEFT OUTER JOIN annonce ON lieu.id_nb = annonce.idLieu_nb");
        $stmt->execute();
        $lieux = [];
        $tempLieu = -1;
        $tempNbAnn = 0;
        $index = -1;
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            //var_dump($data);
            if($data["id_nb"] != $tempLieu) {
                $index++;
                $tempNbAnn = 1;
                if($data["nb_annonces"]==null){
                     $data["nb_annonces"] = 0;
                } else {
                     $data["nb_annonces"] = 1;
                }
                $tempLieu = $data["id_nb"];
                $lieux[$index] = $data;
            } else {
                $tempNbAnn++;
                $data["nb_annonces"] = $tempNbAnn;
                $lieux[$index] = $data;
            }

        }

        header('Content-Type: application/json;charset=utf8;');
        $json_str = json_encode($lieux);
        if ($json_str)
            echo json_encode($lieux);
        else
            echo json_last_error_msg();
    }
    catch(Exception $e)
    {
        exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
    }
}