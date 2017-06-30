<?php 

function db_connect() {
	try {
		// $bdd = new PDO(
		// 	'mysql:host=exlineodev.mysql.db;dbname=exlineodev;charset=utf8',
		//  	'exlineodev',
		//   	'EfHemL887u4U');
		// }
		$bdd = new PDO(
			'mysql:host=localhost;dbname=exlineodev;charset=utf8',
		 	'root',
		  	'root');
		}
	catch(PDOException $e) {
		$bdd = false;
		var_dump($e->getMessage());
		}
	
	return $bdd;
	} 

function recuperer($bdd, $where) {

	// $idChat_nb = 15;

	if($bdd) {
		try { 
			$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$bdd->beginTransaction();
			$response = $bdd->prepare("
				SELECT utilisateur.pseudo_str, utilisateur.photoProfil_img, message.date_dat, message.contenu_str, message.id_nb, message.idExpediteur_nb
				FROM message 
				LEFT JOIN utilisateur ON message.idExpediteur_nb = utilisateur.id_nb 
				$where");

			$response->execute();
			$bdd->commit();
			} 

		catch (Exception $e) {
			$bdd->rollBack();
			echo "Echec fonction recuperer: " . $e->getMessage();
			}	

		$output = $response->fetchAll(PDO::FETCH_CLASS);
		
	} else {
		$output = false;
	}
	
	return $output;
}


function envoyer($bdd, $data)
{
	$champs_ar = array_keys($data);
		// écrit la liste des clés façon requete SQL
		$champs_str = implode(',', $champs_ar);
		// Création des la liste des paramètres à passer à PDO::prepare
	    $placeholders_ar = array_map(function ($champ) {
		    return ":$champ";
		    }, $champs_ar);
	    // Création de la chaîne avec les paramètres
	    $placeholders_str = implode(', ', $placeholders_ar);

	    // Préparation de la requête d'insertion
	    $req = $bdd->prepare("INSERT INTO message ($champs_str) VALUES ($placeholders_str)");

	    // Requête de récupération du dernier id inséré
	    $lastInsertIdReq = $bdd->prepare("SELECT LAST_INSERT_ID();");
	    // Variable pour récupérer le dernier id inséré
	    // On lui donne un fausse valeur
	    $id_nb = -1;

	    // On commence la transaction SQL
	    try {
	        $bdd->beginTransaction();
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
	        $bdd->commit();

	        // Ajout de l'identifiant dans les données à renvoyer
	        $data['id_nb'] = $id_nb[0];

	        return $data;

	    } catch (Exception $e) {
	        $bdd->rollback();
	        // TODO: Améliorer la gestion des erreurs
	        return json_encode([ 'message' => 'Erreur lors de l\'insertion d\'une annonce']);
	    }

}


?>