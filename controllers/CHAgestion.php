<?php 

include_once "CHAgestion_fonctions.php";

$bdd = db_connect();

switch ($_GET["obj"]) {
	case 'lecture':
		# code...
		$id_chat = $_GET["chat"];

		$extract = recuperer($bdd, $id_chat, 5);
		echo json_encode($extract);
		break;
	
	case 'ecriture':
		# code
		if (isset($_GET["id_chat"]) AND isset($_GET["exp_nb"]) AND isset($_GET["contenu"]))
	{
		$id_chat = $_GET["id_chat"];
		$exp_nb = $_GET["exp_nb"];
		$contenu = $_GET["contenu"];

		insertMessage($bdd, $id_chat, $exp_nb, $contenu);
		break;



	}

	case 'bannir':
		#code
		$id_chat = $_GET["chat"];
		$id_exp = $_GET["exp"];
	
		bannirParticipant($bdd, $id_chat, $id_exp);
		break;


	case 'autoriser':
		#code
		$id_chat = $_GET["chat"];
		$mon_id = $_GET["moi"];
		// echo $id_chat;

		autoriserUser($bdd, $id_chat, $mon_id);
		break;


	default:
		# code...
		echo "Erreur PHP ou SQL";
		break;
}

// cloture de la bdd
$bdd = null;

?>