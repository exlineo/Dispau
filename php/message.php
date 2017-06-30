<?php 

include_once "messageFonctions.php";

$bdd = db_connect();

switch ($_GET["action"]) {
	case 'get':
		# code...
		$where = $_GET["where"];

		$extract = recuperer($bdd, $where);

		header('Content-Type: application/json;charset=utf8;');
		echo json_encode($extract);
		break;
	
	case 'create':
		# code
		// tableau associatif
		$data = json_decode(file_get_contents('php://input'), true);

		$data = envoyer($bdd,$data);
		
		// Renvoie du résultat
		header('Content-Type: application/json;charset=utf8;');
		echo json_encode($data);
		break;

	
	
	// Gestion du bannissement à refaire.....
    case "update":
		$data = json_decode(file_get_contents('php://input'), true);

		$data = envoyer($bdd,$data);
		
		// Renvoie du résultat
		header('Content-Type: application/json;charset=utf8;');
		echo json_encode($data);
		break;
        echo updateAnnonce($db, $_POST);
        break;

		default:
		# code...
		echo "Erreur PHP ou SQL";
		break;
}

// cloture de la bdd
$bdd = null;

?>