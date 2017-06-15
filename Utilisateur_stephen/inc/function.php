<?php

// Permet le debug plus facile du register
function debug($variable){
    echo '<pre>'.print_r($variable, true).'</pre>';
}

// Function permettant de créer une clé aléatoire
function str_random($length){
    $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
    return substr(str_shuffle(str_repeat($alphabet, $length)), 0, $length);
}

function logged_invalid(){
    if(session_status() == PHP_SESSION_NONE){
      session_start();
    }
    if(!isset($_SESSION['auth'])){
        $_SESSION['flash']['danger'] = "Vous n'avez pas les droit d'accés";
        header('location: login.php');
        exit();
    }
}