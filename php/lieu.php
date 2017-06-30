<?php

require_once 'connectDB.php';

// Exemple pour récupérer le PDO
$db = db();


/////////// APPELS DES METHODES //////////

/**
 * Permet de récupérer la clause WHERE s'il y en a une
 */

if (isset($_GET['where']))
    $where = $_GET['where'];
else
    $where = false;

switch ($_GET['action'])
{
    case "get" :
        selectLieu($db, $where);
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


function selectLieu($db, $where)
{
    try
    {
        // cas d'un seul lieu
        if ($where)
        {
            $stmt = $db->prepare("SELECT * FROM `lieu` $where");
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $json_str = json_encode($data);
        }
        // cas de tous les lieux
        else
        {
            $lieux = [];
            $tempLieu = -1;
            $tempNbAnn = 0;
            $index = -1;

            $stmt = $db->prepare("SELECT lieu.*, annonce.id_nb as nb_annonces FROM lieu LEFT OUTER JOIN annonce ON lieu.id_nb = annonce.idLieu_nb");
            $stmt->execute();

            while ($data = $stmt->fetch(PDO::FETCH_ASSOC))
            {
                if ($data["id_nb"] != $tempLieu)
                {
                    $index++;
                    $tempNbAnn = 1;

                    if ($data["nb_annonces"] == null)
                         $data["nb_annonces"] = 0;
                    else
                         $data["nb_annonces"] = 1;
                    $tempLieu = $data["id_nb"];
                    $lieux[$index] = $data;
                }
                else
                {
                    $tempNbAnn++;
                    $data["nb_annonces"] = $tempNbAnn;
                    $lieux[$index] = $data;
                }
            }
            $json_str = json_encode($lieux);
        }
        header('Content-Type: application/json;charset=utf8;');

        if ($json_str)
            echo $json_str;
        else
            echo json_last_error_msg();
    }
    catch(Exception $e)
    {
        exit('Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') : '. $e->getMessage());
    }
}
