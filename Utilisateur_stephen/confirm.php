<?php

    // On récupere l'ID et le Token dans l'URL
    $user_id = $_GET['id'];
    $token = $_GET['token'];

    require 'inc/bdd.php';
    // On récuperer le token
    $req = $bdd->prepare('SELECT confirmation_token FROM users WHERE id = ?');
    $req->execute([$user_id]);
    $user = $req->fetch();

    //  on ouvre une session, et 
    session_start();

    // On verifie si le user exist et si le token correspond
    if($user && $user->confirmation_token = $token){
        // Si oui, modifier le token et la date de confirmation
        $bdd->prepare('UPDATE users SET confirmation_token = NULL, confirmed_at = NOW() WHERE id = ?')->execute([$user_id]);
        $_SESSION['flash']['success'] = "Votre compte a bien été validé";
        $_SESSION['auth'] = $user;
        header('location: account.php');
    }else{
        // Si non
        $_SESSION['flash']['danger'] = "Le lien n'est pas valide";
        header('location: login.php');
    }
?>