<?php
/**
 * UTILISATEUR.PHP
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
 * Récupérer un utilisateur :
 * GET http://serveur/php/utilisateur.php?action=get&id=495039
 *
 * Récupére toutes les utilisateurs d'un lieu :
 * GET http://serveur/php/utilisateur.php?action=get&lieu=49549
 *
 * Créer une utilisateur :
 * POST http://serveur/php/utilisateur.php?action=create
 *
 * Modifier une utilisateur :
 * POST http://serveur/php/utilisateur.php?action=update&id=495439
 *
 * Supprimer une utilisateur :
 * GET http://serveur/php/utilisateur.php?action=delete&id=43953429
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
