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
 * Créer un lieu :
 * POST http://serveur/php/lieu.php?action=create
 *
 * Modifier un lieu :
 * POST http://serveur/php/lieu.php?action=update&id=495439
 *
 * Supprimer un lieu :
 * GET http://serveur/php/lieu.php?action=delete&id=43953429
 */

/* Méthodes à coder :
 *  - select()
 *  - insert()
 *  - update()
 *  - delete()
 */

// Connexion BDD
require_once 'connectDB.php';

// Exemple pour récupérer le PDO
$db = db();


/////////// APPELS DES METHODES //////////


//getLieu($db);


/////////// DECLARATION DES METHODES ////////////////




/**
 * Permet de récupérer l'id de l'annonce s'il y en a un
 */

if (isset($_GET['id']))
    $id = $_GET['id'];
else
    $id = null;

if (isset($_GET['where']))
    $where = $_GET['where'];
else
    $where = false;

switch ($_GET['action'])
{
    case "get" :
        echo selectLieu($db, $id);
        getLieux();
        break;

    case "create" :
        $data = json_decode(file_get_contents("php://input"), true);
        echo insertLieu($db, $data);
        break;

    case "update" :
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['id'])) {
            echo updateLieu($db, $id, $data);
        }
        break;

    case "delete" :
        deleteLieu($db, $id);
        break;
}


/**
 * Fonction SELECT
 */


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


function selectLieu($db, $id)
{
    try
    {
        // SELECT d'un seul lieu
        if (isset($id))
        {
            $stmt = $db->prepare("SELECT * FROM `lieu` WHERE `id_nb`= :id_nb");
            $stmt->execute(array('id_nb' => $id));

            $data = $stmt->fetch(PDO::FETCH_ASSOC));
        }

        // SELECT de tous les lieux
        else
        {
            $stmt = $db->prepare("SELECT * FROM `lieu`);
            $stmt->execute();

            $data = $stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        header('Content-Type: application/json;charset=utf8;');
        return json_encode($data);
    }

    catch(Exception $e)
    {
        exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
    }
}


function insertLieu($db, $data)
{
    // Il ne faut pas d'id, c'est le SGBD qui nous la donne
    // On supprime la clé pour ne pas insérer de fausses valeurs
    unset($data['id_nb']);

    // Ce tableau devra servir à gérer les association "one to many" et "many to one"
    // TODO: taiter les associations

    $assocs = [];

    // Pour éviter les erreurs avec les associations
    // on supprime les champs avec des associations (qui finissent pas '_ar')
    foreach ($data as $key => $value) {
        // Les trois lignes qui suivent servent à trouver les champs
        // qui finissent pas '_ar'

        $l = strlen('_ar');
        $substr = substr($key, -$l);
        if ($substr === '_ar')
        {
            // Suppression des clés qui poseront promblème
            $assoc[$key] = $data[$key];
            unset($data[$key]);
        }
    };
    // On récupère la liste des champs à mettre à jour
    $champs_ar = array_keys($data);
    // Création de la chaîne représentant la liste des champs à insérer
    $champs_str = implode(', ', $champs_ar);
    // Création des la liste des paramètres à passer à PDO::prepare
    $placeholders_ar = array_map(function ($champ) {
        return ":$champ";
    }, $champs_ar);
    // Création de la chaîne avec les paramètres
    $placeholders_str = implode(', ', $placeholders_ar);

    // Préparation de la requête d'insertion
    $req = $db->prepare("INSERT INTO `lieu` ($champs_str) VALUES ($placeholders_str)");

    // Requête de récupération du dernier id inséré
    $lastInsertIdReq = $db->prepare("SELECT LAST_INSERT_ID();");

    // Variable pour récupérer le dernier id inséré
    // On lui donne un fausse valeur
    $id_nb = -1;

    // On commence la transaction SQL
    try {
        $db->beginTransaction();
        // On exécute la requête, on envoie l'erreur si elle echoue
        // TODO: Améliorer la gestion d'erreur
        if (!$req->execute($data)) {
            $error = $req->errorInfo();
            echo json_encode($error);
        }
        // Récupération du dernier Id inséré
        $lastInsertIdReq->execute();
        $id_nb = $lastInsertIdReq->fetch();
        // La transaction s'est bien passée, on commit
        $db->commit();
        // Ajout de l'identifiant dans les données à renvoyer
        $data['id_nb'] = $id_nb[0];
        // On remets les association to-many
        // TODO: Traîer les associations
        foreach ($assocs as $key => $value) {
            $data[$key] = $value;
        }
        // Renvoie du résultat
        return json_encode($data);
    } catch (Exception $e) {
        $db->rollback();
        // TODO: Améliorer la gestion des erreurs
        return json_encode([ 'message' => 'Erreur lors de l\'insertion d\'une annonce']);
    }
}



function updateLieu($db, $id, $data)
{

}


function deleteLieu($db, $id){
    try {
        $req = $db->prepare("DELETE FROM `lieu` WHERE id_nb = :id_nb");
        $req->execute(array(
            'id_nb' => $id
        ));
    } catch (Exception $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
}