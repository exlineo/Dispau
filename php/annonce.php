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
 * Permet de récupérer l'action
 */
$action = $_GET['action'];

/**
 * Permet de récupérer l'id de l'annonce
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
        if (!$where)
            echo selectAnnonce($db, $id);
        else
            echo selectAnnonce($db, $id, $where);

        break;

    case "create" :
        $data = json_decode(file_get_contents("php://input"), true);
        echo insertAnnonce($db, $data);
        break;

    case "update" :
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['id'])) {
            echo updateAnnonce($db, $id, $data);
        }
        break;

    case "delete" :
        echo deleteAnnonce($id);
        break;
}


/**
 * Permet de récupérer les annonces par rapport à l'ID
 * @param PDO $db           L'instance de PDO représentant la connexion à la BDD
 * @param string|int $id    Indentifiant de l'annonce
 * @return string           Une annonce ou un tableau d'annonces au format JSON
 */
function selectAnnonce($db, $id, $where = '')
{
    try {
        if (!isset($id)) {
            $req = $db->prepare("SELECT * FROM `annonce` $where");
            $req->execute();
            $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $req = $db->prepare("SELECT * FROM `annonce` WHERE id_nb = :id_nb");
            $req->execute(array(
                'id_nb' => $id
            ));
            $donnees = $req->fetch(PDO::FETCH_ASSOC);
        }

        return json_encode($donnees);
    } catch (Exception $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    //return $donnees;
}

/**
 * Insère une annonce dans la base de données
 * @param PDO       $db     La connection à la base de données
 * @param []        $data   Les données à insérer
 * @return string           Une chaîne JSON représentant les données insérée
 */
function insertAnnonce($db, $data)
{
    // Il ne faut pas d'id, c'est le SGBD qui nous la donne
    // On supprime la clé pour ne pas insérer de fausses valeurs
    unset($data['id_nb']);

    // Ce tableau devra servir à gérer les association "one to many" et "many to one"
    // TODO: taîter les associations
    $assocs = [];

    // Pour éviter les erreurs avec les associations
    // on supprime les champs avec des associations (qui finnissent pas '_ar')
    foreach ($data as $key => $value) {
        // Les trois lignes qui suivent servent à trouver les champs
        // qui finissent pas '_ar'
        $l = strlen('_ar');
        $substr = substr($key, -$l);

        if ($substr === '_ar') {
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
    $req = $db->prepare("INSERT INTO `annonce` ($champs_str) VALUES ($placeholders_str)");

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

function updateAnnonce($db, $id, $data)
{
    return json_encode($data);
}
    /*$db = db();

    $req = $db->prepare();
}

function deleteAnnonce($db, $id){
    try{
        $req = $db->prepare("DELETE FROM `annonce` WHERE id_nb = :id_nb");
        $req->execute(array(
            'id_nb' => $id
        ));
    } catch (Exception $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
}
*/