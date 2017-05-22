<?php 

include_once "CHAgestion_fonctions.php";

$bdd = db_connect();

if ($_POST["obj"] == "lecture");
{
	$id_chat = $_POST["chat"];// ------> REVOIR FILTRAGE PAR ID_CHAT

	$extract = get_posts($bdd, 5);

	echo json_encode($extract);

}





// echo $extract[1]["ID_NB"];
// echo "[{\"id_nb\":\"";

// foreach($extract as $message) {
// 	echo json_encode($message);
// 	}



// echo  1015546688877444;
// echo "\",\"";
// echo "expediteur_nb";
// echo  "\":\"";
// echo  10;
// echo "\",\"";
// echo "contenu_str";
// echo  "\":\"";
// echo "Le poker c"est vraiment Super !";
// echo "\"},{\"";
// echo "id_nb";
// echo "\":\"";
// echo  1545545456666666;
// echo "\",\"";
// echo "expediteur_nb";
// echo  "\":\"";
// echo 32;
// echo "\",\"";
// echo "contenu_str";
// echo "\":\""; 
// echo "f*** the poker";
// echo "\"}]";






 ?>