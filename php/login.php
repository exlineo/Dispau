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
require_once 'firebase/JWT/JWT.php';
require_once '../AjaxService.js';

use \firebase\JWT\JWT;

$secret = "key";
$token = array(
    "iss" => "http://dispau.fr",
    "aud" => "http://dispau.com",
    "iat" => time(),
    "nbf" => 1357000000
);

$jwt = JWT::encode($token, $secret);

AjaxService($http, $cookies);
// Debut de la session
session_start();

$post_file = file_get_contents('http://input');
// Si le post n'est pas vide, ni le pseudo ni le password
if(!empty($_POST) && !empty($_POST['pseudo']) && !empty($_POST['password'])){
    $errors = [];
    // On prépare la requete
    $req = db()->prepare('SELECT * FROM utilisateur WHERE pseudo_str = :pseudo OR email_str = :pseudo');
    $req->execute(['pseudo' => $_POST['pseudo']]);
    $user = $req->fetch();

    if($user){
    // check the password
    $password_hash = md5($_POST['password']);
        if($password_hash == $user['pass_str'])){
            // $token = getallheaders()['X-Access-Token'];
            // try {
            //     // On décode le token
            //     // $secret est la phrase secrète utilisée pour encoder le token
            //     $decoded = JWT::decode($token, $secret, array('HS256'));
            //     echo '<pre>'.print_r($decoded).'</pre>';
            // } catch (Exception $e) {
            //     // Le décodage échoue
            //     // On revoie un erreur 401 - Unauthorized
            //     http_response_code(401);
            //     echo 'Erreur d\'authentification';
            //     // Fin de l'execution du script
            // exit();
            // }
        }else{
            $errors = "Votre pseudo/email ou votre mot de passe est erroné";
            echo "Error : wrong password";
        }
    }else{
        $errors = "Votre pseudo/email ou votre mot de passe est erroné";
        echo "Error : user not found";
    }
        // If checkbox not empty
        if(!empty($_POST['api-token'])){
            $token = getallheaders()['X-Access-Token'];
            // Create token with function (see function.php)
             try {
                // On décode le token
                // $secret est la phrase secrète utilisée pour encoder le token
                $decoded = JWT::decode($token, $secret);
                echo '<pre>'.print_r($decoded).'</pre>';
            } catch (Exception $e) {
                // Le décodage échoue
                // On revoie un erreur 401 - Unauthorized
                http_response_code(401);
                $errors = "Erreur d'authentification";
                // Fin de l'execution du script
            exit();
            }
            // Start the cookie for 7 days
            setcookie('api-token', $user->id . '==' . $token. sha1($user->id . '1475269'), time() + 60 * 60 * 24 * 7);
            // L'utilisateur est authentifier par la session
            $_SESSION['AUTH'];
            header('location: ../index.html');
        }
    // L'utilisateur est authentifier par la session
    $_SESSION['AUTH'];
    header('location: ../index.html');
}
