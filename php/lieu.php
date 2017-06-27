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
 * Récupére tous les lieux d'un lieu :
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
 *
 */

// Connexion BDD
require_once 'connectDB.php';

/**
 * Récupération des paramètres d'URL
 */
$action = (isset($_GET['action']) ? $_GET['action'] : '');
$id = (isset($_GET['id']) ? $_GET['id'] : '');


/**
 * Récuppération d'un lieu
 *
 * @param
 * @return object JSON
 */
function select() {

	if( $action == 'get' && true == is_numeric($id) ) {

		// Connexion BDD
		$db = db();

		try
		{
			// Préparation de la requête
			$stmt = $this->pdo->prepare('SELECT * FROM `lieu` WHERE id = ?');

			// Exécution de la requête selon son placeholder
			$stmt->execute(array(
								'id' => $id
								));
			// Fetch
			$data = $stmt->fetch(PDO::FETCH_ASSOC);

		}

		// Erreurs
		catch(Exception $e)
		{
			exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
		}

		// Crée le JSON de données
		return json_encode($data);

	} // End if

}


/**
 * Insertion d'un nouveau lieu
 *
 * @param
 * @return
 */
function insert() {

	// Soumission du formulaire
	if ( $_POST['submit'] && empty($id) ) {

		// Nouveau lieu : variable de ID vide
		$idLieu = '';
		// Connexion BDD
		$db = db();

		// Vérifie l'existance de chaque valeur
		foreach ($_POST as $key => $value) {

			// Existence de chaque valeur d'envoi
			if ( isset($value) ) {

				// Preparation de la requête
				try
				{
					$stmt = $this->pdo->prepare('INSERT INTO `lieu` 
															(nom_str, 
															idChat_nb, 
															longitude_nb, 
															latitude_nb, 
															annonce_ar,
															sousLieu_ar, 
															utilisateur_ar, 
															adresse_str, 
															description_str, 
															image_str, 
															idAdmin_nb)
														VALUES (
															 :nom_str,
															 :idChat_nb,
															 :longitude_nb,
															 :latitude_nb,
															 :annonce_ar,
															 :sousLieu_ar,
															 :utilisateur_ar,
															 :adresse_ar,
															 :description_str,
															 :image_str,
															 :idAdmin_nb)
												');

					// Exécution de la requête selon ses placeholders
					$stmt->execute(array(
										'nom_str' => $_POST['nom_str'],
										'idChat_nb' => $_POST['idChat_nb'],
										'longitude_nb' => $_POST['longitude_nb'],
										'latitude_nb' => $_POST['latitude_nb'],
										'annonce_ar' => $_POST['annonce_ar'],
										'sousLieu_ar' => $_POST['sousLieu_ar'],
										'utilisateur_ar' => $_POST['utilisateur_ar'],
										'adresse_ar' => $_POST['adresse_ar'],
										'description_str' => $_POST['description_str'],
										'image_str' => $_POST['image_str'],
										'idAdmin_nb' => $_POST['idAdmin_nb']
										));

					$idLieu = $db->LastInsertId(); //$id = mysql_insert_id();

				}

				// Erreurs
				catch(Exception $e)
				{
					exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
				}

			} // End if

		} // End foreach

	} // End submit

}


/**
 * Mise à jour d'un lieu
 *
 * @param int $id ID du lieu
 * @return
 */
function update() {

	if ( $action == 'update' && true == is_numeric($id) ) {

		// Préparation de la requête
		$stmt = $bd->prepare('UPDATE 
	 							`lieu` 
	 						  SET 
	 					   		nom_str = :nom_str,
	 					   		idChat_nb = :idChat_nb,
	 					   		longitude_nb = :longitude_nb,
	 					   		latitude_nb = :latitude_nb,
	 					   		annonce_ar = :annonce_ar,
	 					   		sousLieu_ar = : sousLieu_ar,
	 					   		utilisateur_ar = :utilisateur_ar,
	 					   		adresse_str = :adresse_str,
	 					   		description_str = :description_str,
	 					   		image_str = :image_str,
	 					   		idAdmin_nb = idAdmin_nb
	 						  WHERE id = :id
	 					');

		// Exécution de la requête par population des champs
		$stmt->execute(array(
							'nom_str' => $_POST['nom_str'],
							'idChat_nb' => $_POST['idChat_nb'],
							'longitude_nb' => $_POST['longitude_nb'],
							'latitude_nb' => $_POST['latitude_nb'],
							'annonce_ar' => $_POST['annonce_ar'],
							'sousLieu_ar' => $_POST['sousLieu_ar'],
							'utilisateur_ar' => $_POST['utilisateur_ar'],
							'adresse_str' => $_POST['adresse_str'],
							'description_str' => $_POST['description_str'],
							'image_str' => $_POST['image_str'],
							'idAdmin_nb' => $_POST['idAdmin_nb'],
							'id' => $id
						));

	}

}


/**
 * Suppression d'un lieu dans la BDD 
 *
 * @param  int $id ID du lieu
 * @return  	   Supprime le lieu selon son ID
 */
function delete($id) {

	if( $_GET['action'] == 'delete' && true == is_numeric($id) ) {

		// Connexion BDD
		$db = db();

		// Préparation de la requête
		try
		{
			$stmt = $this->prepare('DELETE * FROM `lieu` WHERE id = :id');
		}

		// Erreurs
		catch(Exception $e)
		{
			exit('<b>Catched exception at line '. $e->getLine() .' (code : '. $e->getCode() .') :</b> '. $e->getMessage());
		}

		$stmt->execute(array('id' => $id));
	}

}
