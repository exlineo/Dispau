<?php 

include_once "CHAgestion_fonctions.php";

$bdd = db_connect();

if ($_POST["obj"] == "ecriture");
{

	if (isset($_POST["id_chat"]) AND isset($_POST["id_nb"]) AND isset($_POST["exp_nb"]) AND isset($_POST["contenu"]))
	{
		$id_chat = $_POST["id_chat"];
		$id_nb = $_POST["id_nb"];
		$exp_nb = $_POST["exp_nb"];
		$contenu = $_POST["contenu"];

		insertMessage($bdd, $id_chat, $id_nb, $exp_nb, $contenu);

	}
}

?>