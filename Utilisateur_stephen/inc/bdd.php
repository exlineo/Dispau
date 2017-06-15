<?php
    $bdd = new PDO('mysql:host=localhost;dbname=tutouser','root','',
                    array(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION));
$bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
?>