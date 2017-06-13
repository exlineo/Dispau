<?php
/**
 * Appelé pour gérer la connection d'un utilisateur
 *
 * N'accepte que les méthodes POST !!!
 *
 * Doit traiter une requête contenant le login et le mot de passe de l'utilisateur
 * Renvoie un token
 *
 */

/**
 * Méthodes à coder :
 *
 * verifierUtilisateur($_POST)
 *
 * encoderToken($utilisateur)
 *
 * envoyerSucces($token)
 * envoyerErreur()
 */

require_once 'connectDB.php';