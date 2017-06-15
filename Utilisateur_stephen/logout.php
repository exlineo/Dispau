<?php
// On ouvre la section
session_start();
// On supprime le type 'auth' de la session
unset($_SESSION['auth']);
// Success
$_SESSION['flash']['success'] = "Vous êtes bien deconnecté";
// On retourne au login.php
header('location: login.php');