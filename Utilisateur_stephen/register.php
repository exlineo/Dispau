
<?php 
require_once 'inc/function.php';

session_start();
// Si le form n'est pas vide
if(!empty($_POST)){

    // Tableau d'erreur
    $errors = array();

    require_once 'inc/bdd.php';

    // Si le post username est vide ou qu'il ne correspond pas au regex
    if(empty($_POST['username']) || !preg_match('/^[A-Za-z0-9_]+$/', $_POST['username'])){
        $errors['username'] = "Veuillez renseigner le champ Pseudo sans caractère spéciaux";
    }else{
        // Si conforme, on verifie que le pseudo n'est pas déjà utilisé
        // On recherche dans la bdd
        $req = $bdd->prepare('SELECT id FROM users WHERE username = ?');
        $req->execute([$_POST['username']]);
        $user = $req->fetch();
        // Si le pseudo est pas déjà utilisé
        if($user){
            $errors['username'] = "Votre pseudo est déja pris";
        }
    }
    // Si le post email est vide ou qu'il ne correspond pas 
    if(empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
        $errors['email'] = "Votre email n'est pas valide";
    }else{
        // Si conforme, on verifie que l'email n'est pas déjà utilisé
        // On recherche dans la bdd        
        $req = $bdd->prepare('SELECT id FROM users WHERE email = ?');
        $req->execute([$_POST['email']]);
        $user = $req->fetch();
        // Si l'email est pas déjà utilisé
        if($user){
            $errors['email'] = "Cette email est déja utilisé";
        }
    }

    // Verifier si le password est vide, et qu'il correspond au password de confirmation
    if(empty($_POST['password']) || $_POST['password'] != $_POST['password_confirm']){
        $errors['password'] = "Votre password n'est pas valide";
    }
    //  Permet d'appeller la function qui debug via function.php
    // debug($errors);

    // Si il n'y a pas d'erreurs, on peux envoyer les données
    if(empty($errors)){
        $req = $bdd->prepare('INSERT INTO users SET username = ?, password = ?, email = ?, confirmation_token = ?');
        // Appel de la function pour créer le token, voir dans function.php
        $token = str_random(60);
        // On cripte le password
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $req->execute([$_POST['username'], $password, $_POST['email'], $token]);
        // On recuperer le dernier ID enregistrer
        $user_id = $bdd->lastInsertId();
        // Envoie d'un mail de confirmation avec une adresse cliquable
        mail($_POST['email'], 'Confirmation de votre compte', "Afin de valider votre compte, merci de clique sur ce lien :\n\nhttp://localhost/Utilisateur/confirm.php?id=$user_id&token=$token");
        //Renvoie sur la page login.php après exécution de l'envoie du mail
        $_SESSION['flash']['success'] = "Un email de confirmation vous a été envoyer";
        header('location: login.php');
        exit();
    }
}
?>

<?php require 'inc/header.php' ?>

<h1>s'incrire</h1>

<!--Permet d'afficher les erreurs de saisie de l'utilisateur-->
<?php if(!empty($errors)): ?>
    <div class="alert alert-danger">
        <p>Vous n'avez pas rempli le formulaire correctement :</p>
        <ul>
            <?php foreach($errors as $error): ?>
                    <li><?= $error; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form action="" method="POST">
    <div class="form-group">
        <label for="">Nom :</label>
        <input type="text" name="username" class="form-control" >
    </div>

    <div class="form-group">
        <label for="">Email :</label>
        <input type="text" name="email" class="form-control" >
    </div>

    <div class="form-group">
        <label for="">Password :</label>
        <input type="password" name="password" class="form-control" >
    </div>

    <div class="form-group">
        <label for="">Confirmation password :</label>
        <input type="password" name="password_confirm" class="form-control" >
    </div>

    <button type="submit" class="btn btn-primary">M'inscrire</button>
</form>

<?php require 'inc/footer.php'; ?>