<?php 
session_start();
require_once 'inc/function.php';

if(!empty($_POST) && !empty($_POST['username_co']) && !empty($_POST['password_co'])){
    require_once 'inc/bdd.php';

    $req = $bdd->prepare('SELECT * FROM users WHERE (username = :username OR email = :username) AND confirmed_at IS NOT NULL');
    $req->execute(['username' => $_POST['username_co']]);
    $user = $req->fetch();

    if(password_verify($_POST['password_co'], $user->password)){
        $_SESSION['auth'] = $user;
        $_SESSION['flash']['success'] = "Vous êtes connecté";
        header('location: account.php');
        exit();
    }else{
        $_SESSION['flash']['danger'] = "L'identifiant ou le password est invalide";
    }

}
?>

<?php require 'inc/header.php'; ?>

<h1>Votre compte</h1>

<?php debug($_SESSION); ?>

<h1>Se connecter</h1>

<form action="" method="POST">
    <div class="form-group">
        <label for="">Votre nom ou email:</label>
        <input type="text" name="username_co" class="form-control">
    </div>

    <div class="form-group">
        <label for="">Votre mot de passe <a href="forget.php">(mot de passe oublié ?)</a> :</label>
        <input type="password" name="password_co" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary">Me connecter</button>
</form>

<?php require 'inc/footer.php'; ?>