<?php 
require_once 'inc/function.php';

if(!empty($_POST) && !empty($_POST['username_co']) ){
    require_once 'inc/bdd.php';

    $req = $bdd->prepare('SELECT * FROM users WHERE (email = :email) AND confirmed_at IS NOT NULL');
    $req->execute(['email' => $_POST['email']]);
    $user = $req->fetch();

    if($user){
        session_start();
        $reset_token = str_random(60);
        $req = $bdd->prepare('UPDATE users SET reset_token = ?, reset_at = NOW() WHERE id = ?');
        $req->execute([$reset_token, $user->id]);
        mail($_POST['email'], 'Renvoie de votre mot de passe', "Afin de réinisialiser le mot de passe, merci de clique sur ce lien :\n\nhttp://localhost/Utilisateur/reset.php?id={$user->id}&rese_token=$reset_token");
        $_SESSION['flash']['success'] = "Un mail vous a été envoyer";
        header('location: login.php');
        exit();
    }else{
        $_SESSION['flash']['danger'] = "Le mot de passe est invalide";
    }
}
?>

<?php require 'inc/header.php'; ?>

<h1>Votre compte</h1>

<?php debug($_SESSION); ?>

<h1>Mot de passe oublier</h1>

<form action="" method="POST">
    <div class="form-group">
        <label for="">Votre email :</label>
        <input type="email" name="email" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary">Envoyer</button>
</form>

<?php require 'inc/footer.php'; ?>