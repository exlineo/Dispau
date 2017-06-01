<?php 

function db_connect() {
	try {
		$bdd = new PDO('mysql:host=localhost;dbname=dispau;charset=utf8',
		 'root',
		  'root');

	}

	catch(PDOException $e) {
		$bdd = false;
		var_dump($e->getMessage());

	}
	
	var_dump($bdd);
	return $bdd;
} 


function insertMessage($bdd, $id_chat, $id_nb, $exp_nb, $contenu) {	
	$empty = (empty($id_chat) || empty($id_nb)|| empty($exp_nb)|| empty($contenu));
	
	$id_chat = htmlspecialchars($id_chat);
	$id_nb = htmlspecialchars($id_nb);
	$exp_nb = htmlspecialchars($exp_nb);
	$contenu = htmlspecialchars($contenu);
	
	if($bdd && !$empty) {
		$req = $bdd->prepare('INSERT INTO messages (ID_CHAT, ID_NB, EXP_NB, CONTENU) VALUES (?, ?, ?, ?)');

		return $req->execute(array($id_chat, $id_nb, $exp_nb, $contenu));

	} else {
		return false;
	}
}

//renvoyer les resultats
function get_posts($bdd, $num_of_posts) {
	if($bdd) {
		$limit = '0 , ' . $num_of_posts;
	
		$response = $bdd->prepare('SELECT ID_NB, EXP_NB, CONTENU FROM messages ORDER BY ID_KEY DESC LIMIT ' . $limit);
		$response->execute();

		$output = $response->fetchAll();
		
	} else {
		$output = false;
	}
	
	return $output;
}


 ?>