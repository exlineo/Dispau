/* form-traitement.js */

/**
 * ready
 * @function
 */
$(document).ready(function() {

	$('#form-password-input').on('input', function() {
		var password_str = this.value;
		var password_check_str = $('#form-password-check-input').val();
 		// check egalite passwords
		var state = checkPasswordsEgal(password_str, password_check_str);
		// test console
  		console.log(state);
	});

	$('#form-password-check-input').on('input', function() {
		var password_check_str = this.value;
		var password_str = $('#form-password-input').val();
 		// check egalite passwords
		var state = checkPasswordsEgal(password_str, password_check_str);
		// test console
  		console.log(state);
	});

	// form-btn-user-send action
	$('#form-btn-user-send').click(function(event) {
	  	event.preventDefault();
	  	recupFormData();
	});

});

/**
 * recupFormData
 * @function
 * return userData
 */
function recupFormData()
{
	// recup valeur input pseudo_str
	var pseudo_str = $('#form-pseudo-input').val();

	// recup valeur input password_str
	var password_str = $('#form-password-input').val();

	// recup valeur nom_str
	var nom_str = $('#form-nom-input').val();

	// recup valeur prenom_str
	var prenom_str = $('#form-prenom-input').val();

	// recup valeur email_str
	var email_str = $('#form-email-input').val();

	// recup valeur file_str
	var file_str = $('#form-file-input').val();

	var userData = {
		"pseudo_str": pseudo_str,
		"password_str": password_str,
		"nom_str": nom_str,
		"prenom_str": prenom_str,
		"email_str": email_str,
		"file_str": file_str
	}
	console.log(userData);

	return userData;
}

/**
 * checkPasswordsEgal
 * @function
 * return bool
 */
function checkPasswordsEgal(password_str, password_check_str)
{
	// variable comparaison
	var compare_nb = password_str.localeCompare(password_check_str);

	// test comparaison
	if(compare_nb == 0)
	{
		// strings ==
		return true;
	}
	else
	{
		// string !=
		return false;
	}
}