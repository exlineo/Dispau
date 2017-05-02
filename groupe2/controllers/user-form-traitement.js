/* form-traitement.js */

/**
 * TraitementUserCreateForm
 * @class
 */

function TraitementUserCreateForm() {

	this.passwords_egal_bl = false;
	this.emails_egal_bl = false;
	this.form_is_valid_bl = false;
	this.userData_obj = {};
	var ici = this;

	this.checkEgal = function (_id1_str, _id2_str, _varActualise_str)
	{
		// quelles variables sont à actualiser
		var actualisePassword = false;
		var actualiseEmail = false;
		_varActualise_str.localeCompare('password') == 0 ? actualisePassword = true : actualiseEmail = true;
		var actualiseVar = false;
		var id1_str = _id1_str;
		var id2_str = _id2_str;
		var ici = this;

		// check input on change #form-password-input
		$(id1_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id2_str).val();
	 		// check egalite 
	 		//compareStrings(val1, val2) ? actualiseVar = true : actualiseVar = false;
	 		if (compareStrings(val1, val2)) 
	 		{
	 			console.log('ok');
	 			if (actualisePassword) 
	 			{
	 				ici.passwords_egal_bl = true;
	 			}
	 			else if (actualiseEmail)
	 			{
	 				ici.emails_egal_bl = true;
	 			}
	 		}
		});

		// check input on change #form-password-check-input
		$(id2_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id1_str).val();
	 		// check egalite
	  		//compareStrings(val1, val2) ? actualiseVar = true : actualiseVar = false;
	 		if (compareStrings(val1, val2)) 
	 		{
	 			console.log('ok');
	 			if (actualisePassword) 
	 			{
	 				ici.passwords_egal_bl = true;
	 			}
	 			else if (actualiseEmail)
	 			{
	 				ici.emails_egal_bl = true;
	 			}
	 		}
		});
	}

	/**
	 * compareStrings
	 * @function
	 * return bool
	 */
	function compareStrings(string_one_str, string_two_str)
	{
		// variable comparaison
		var compare_nb = string_one_str.localeCompare(string_two_str);
		// test comparaison
		return compare_nb == 0 ? true : false;
	}

	/**
	 * form-btn-user-send action
	 * @function
	 */
	$('#form-btn-user-send').click(function(event) {
	  	event.preventDefault();
	  	recupFormData();
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

		var userData_obj = {
			"pseudo_str": pseudo_str,
			"password_str": password_str,
			"nom_str": nom_str,
			"prenom_str": prenom_str,
			"email_str": email_str,
			"file_str": file_str
		}
		//console.log(userData_obj);
		this.userData_obj = userData_obj;
		console.log(userData_obj);
		console.log(this.passwords_egal_bl);
	}

		// check input on change #form-password-input
		$('#form-password-input').on('input', function() {
			var password_str = this.value;
			var password_check_str = $('#form-password-check-input').val();
	 		// check egalite passwords
			var state_bl = compareStrings(password_str, password_check_str);
			// test console
	  		console.log(state_bl);
	  		// update this.passwords_egal_bl
	  		state_bl ? this.passwords_egal_bl = true : this.passwords_egal_bl = false;

	  		console.log('passwords egal : ' + this.passwords_egal_bl);
		});

		// check input on change #form-password-check-input
		$('#form-password-check-input').on('input', function() {
			var password_check_str = this.value;
			var password_str = $('#form-password-input').val();
	 		// check egalite passwords
			var state_bl = compareStrings(password_str, password_check_str);
			// test console
	  		console.log(state_bl);
	  		// update this.passwords_egal_bl
			state_bl ? this.passwords_egal_bl = true : this.passwords_egal_bl = false;

	  		console.log('passwords egal : ' + this.passwords_egal_bl);
		});

}


/**
 * ready
 * @function
 */
$(document).ready(function() {

	/**
     * click
     * @function
     * click sur parameters
     */
	$("#btn-parameters").click(function() {
		// toggle class .para-open
		$('#parameters').toggleClass("para-open");
	}); 

	var nouvelUtilisateur = new TraitementUserCreateForm();
	nouvelUtilisateur.checkEgal('#form-password-input', '#form-password-check-input', 'password');
	nouvelUtilisateur.checkEgal('#form-password-input', '#form-password-check-input', 'email');
});



