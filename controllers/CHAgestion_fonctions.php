<?php 

function db_connect() {
	try {
		$bdd = new PDO(
			'mysql:host=localhost;dbname=dispau;charset=utf8',
		 	'root',
		  	'root');
		}

	catch(PDOException $e) {
		$bdd = false;
		var_dump($e->getMessage());
		}
	
	return $bdd;
	} 


function insertMessage($bdd, $id_chat, $exp_nb, $contenu) {	
	$empty = (empty($id_chat) || empty($exp_nb)|| empty($contenu));
	
	$id_chat = htmlspecialchars($id_chat);
	$exp_nb = htmlspecialchars($exp_nb);
	$contenu = htmlspecialchars($contenu);
	$id_nb = time();
	// première requete pour vérifier que l'expéditeur n'est pas banni.
	$compte = 10;
	if($bdd && !$empty) {
		# code...
		$test = $bdd->prepare('
				SELECT * 
				FROM messages 
				WHERE ( 
					ID_CHAT = ' . $id_chat
					.' AND EXP_NB = ' . $exp_nb  
					.' AND BANNI = 1 )');


		$test->execute();
		// compte le nombre de lignes sélectionnées
		$compte = $test->rowCount();
		}
	if ($compte > 0) {
		# code...
		return false;
	}
	// seconde requete pour insérer le message
	if($bdd && ($compte < 1)) {
		$req = $bdd->prepare('
			INSERT INTO messages (ID_CHAT, ID_NB, EXP_NB, CONTENU) 
			VALUES (?, ?, ?, ?)');

		return $req->execute(array($id_chat, $id_nb, $exp_nb, $contenu));

	} else {
		return false;
	}
}

function bannirParticipant($bdd, $id_chat, $exp_nb) {	
	$empty = (empty($id_chat) || empty($exp_nb));

	if($bdd && !$empty) {
		$req = $bdd->prepare('
			UPDATE messages 
			SET BANNI = 1 
			WHERE (ID_CHAT = ? AND EXP_NB = ? )');

		return $req->execute(array( $id_chat, $exp_nb));
	} else {
		return false;
	}
}

//renvoyer les resultats
function recuperer($bdd, $id_chat, $num_of_posts) {

	if($bdd) {
		$limit = '0 , ' . $num_of_posts;
	
		$response = $bdd->prepare('
			SELECT ID_NB, EXP_NB, CONTENU 
			FROM messages 
			WHERE (ID_CHAT = ' . $id_chat . ' AND BANNI = 0) 
			ORDER BY ID_KEY DESC LIMIT ' . $limit);
		
		$response->execute();
		$output = $response->fetchAll();
		
	} else {
		$output = false;
	}
	
	return $output;
}

function autoriserUser($bdd, $id_chat, $mon_id) {

	$empty = (empty($id_chat) || empty($mon_id));
	
	// vérifier que l'expéditeur n'est pas banni.
	$compte = 10;
	if($bdd && !$empty) {
		# code...
		$test = $bdd->prepare('
				SELECT COUNT(*) 
				FROM messages 
				WHERE ( 
					ID_CHAT = ' . $id_chat
					.' AND EXP_NB = ' . $exp_nb  
					.' AND BANNI = 1 )');


		$test->execute();
		// compte le nombre de lignes sélectionnées
		$compte = $test->rowCount();
		// print($compte);
		$output = $compte;
	}	
	else 
	{
		$output = false;	
	}

	return $output;
}

 ?>