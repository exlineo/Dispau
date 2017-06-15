<?php 
require 'inc/function.php'; 
logged_invalid();
require 'inc/header.php';
 ?>

<h1>Votre compte</h1>

<?php debug($_SESSION); ?>
<!--Creer le contenu profil $_SESSION['auth']->username-->
<!--Creer la page accountEdit, UPDATE-->

<!--if(empty($_POST) || $_POST[''] != $_POST['']){
   $_SESSION['flash']....
}else{
    
}-->

<!--Pouvoir supprimer son compte, DELETE-->

<?php require 'inc/footer.php'; ?>