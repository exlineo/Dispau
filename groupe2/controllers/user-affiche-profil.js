/* user-affiche-profil.js */

$(document).ready(function() {

	// var jacqueLembrouille = new Utilisateur();
	// var jenny = new Administrateur();

	var paul = new Profil();
	paul.hydrate(users_ar[0]);
	console.log(paul);
	afficherDataUser(paul);

});

function afficherDataUser(utilisateur_obj)
{
	// pseudo_str
	$('#pseudo').html(utilisateur_obj.pseudo_str);
	// password_str
	$('#password').html(utilisateur_obj.pass_str);
	// nom_str
	$('#nom').html(utilisateur_obj.nom_str);
	// prenom_str
	$('#prenom').html(utilisateur_obj.prenom_str);
	// email_str
	$('#email').html(utilisateur_obj.email_str);
	// description_str
	$('#description').html(utilisateur_obj.description_str);
	// image-profil
	var imageUrl = utilisateur_obj.image_img[0];
	
	$('#image-profil').css({
		"background": "url('"+imageUrl+"')", 
		"background-size": "cover",
		"background-position": "center top"
	});
}