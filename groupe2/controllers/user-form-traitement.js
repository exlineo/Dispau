/* form-traitement.js */

var app = angular.module('app', []);

app.controller('UserCreateFormCtrl', function(){

/**
 * TraitementUserCreateForm
 * @class
 */

function TraitementUserCreateForm() {

	this.check_pseudo_bl = false;
	this.check_password_bl = false;
	this.check_nom_bl = false;
	this.check_prenom_bl = false;
	this.check_email_bl = false;
	this.check_email_bl = false;
	this.check_img_bl = false;
	var ici = this;

	/**
	 * checkPassword_fn
	 * @function
	 */
	this.checkPassword_fn = function (_id1_str, _id2_str)
	{
		var actualVar_bl = null;
		var id1_str = _id1_str;
		var id2_str = _id2_str;

		// check input on change _id1_str
		$(id1_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id2_str).val();
	 		// check egalite 
	 		compareStrings(val1, val2) ? actualVar_bl = true : actualVar_bl = false;
	 		console.log(actualVar_bl);
	 		// highlight fields
	 		highLighTwoFields_fn(actualVar_bl, _id1_str, _id2_str);
	 		// update check_password_bl
	 		ici.check_password_bl = actualVar_bl;
		});

		// check input on _id2_str
		$(id2_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id1_str).val();
	 		// check egalite 
	 		compareStrings(val1, val2) ? actualVar_bl = true : actualVar_bl = false;
	 		console.log(actualVar_bl);
	 		// highlight fields
	 		highLighTwoFields_fn(actualVar_bl, _id1_str, _id2_str);
	 		// update check_password_bl
	 		ici.check_password_bl = actualVar_bl;
		});
	}

	/**
	 * highLighTwoFields_fn
	 * @function
	 */
	 function highLighTwoFields_fn(activate_bl, _id1_str, _id2_str)
	 {
	 	// highlight form fields
		if(activate_bl === false)
		{
			$(_id1_str).css("background-color", "#ffe");
			$(_id2_str).css("background-color", "#ffe");
		}
		else
		{
			$(_id1_str).css("background-color", "#fff");
			$(_id2_str).css("background-color", "#fff");
		}
	 }

	/**
	 * highLighOneField_fn
	 * @function
	 */
	 function highLighOneField_fn(activate_bl, _id1_str)
	 {
	 	// highlight form field
		if(activate_bl === false)
		{
			$(_id1_str).css("background-color", "#ffe");
		}
		else
		{
			$(_id1_str).css("background-color", "#fff");
		}
	 }

	/**
	 * checkEmail_fn
	 * @function
	 */
	this.checkEmail_fn = function (_id1_str, _id2_str)
	{
		var actualVar_bl = false;
		var id1_str = _id1_str;
		var id2_str = _id2_str;

		// check input on change _id1_str
		$(id1_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id2_str).val();
	 		// check egalite 
	 		compareStrings(val1, val2) ? actualVar_bl = true : actualVar_bl = false;
	 		console.log(actualVar_bl);
	 		// highlight fields
	 		highLighTwoFields_fn(actualVar_bl, _id1_str, _id2_str);
	 		// update check_email_bl
	 		ici.check_email_bl = actualVar_bl;
		});

		// check input on _id2_str
		$(id2_str).on('input', function() {
			var val1 = this.value;
			var val2 = $(id1_str).val();
	 		// check egalite 
	 		compareStrings(val1, val2) ? actualVar_bl = true : actualVar_bl = false;
	 		// highlight fields
	 		highLighTwoFields_fn(actualVar_bl, _id1_str, _id2_str);
	 		console.log(actualVar_bl);
	 		// update check_email_bl
	 		ici.check_email_bl = actualVar_bl;
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
	 * recupFormData
	 * @function
	 * return userData
	 */
	this.recupFormData = function ()
	{
		var userData_obj = 
		{
			"pseudo_str": 	{
								'id': '#form-pseudo-input',
								'state': this.check_pseudo_bl,
								'value': $('#form-pseudo-input').val()
							},
			"password_str":
							{
								'id': '#form-password-input',
								'state': this.check_password_bl,
								'value': $('#form-password-input').val()
							},
			"password_check":
							{
								'id': '#form-password-check-input',
								'state': this.check_password_bl,
								'value': $('#form-password-check-input').val()
							},
			"nom_str":
							{
								'id': '#form-nom-input',
								'state': this.check_nom_bl,
								'value': $('#form-nom-input').val()
							},
			"prenom_str":
							{
								'id': '#form-prenom-input',
								'state': this.check_prenom_bl,
								'value': $('#form-prenom-input').val()
							},
			"email_str":
							{
								'id': '#form-email-input',
								'state': this.check_email_bl,
								'value': $('#form-email-input').val()
							},
			"email_str":
							{
								'id': '#form-email-check-input',
								'state': this.check_email_bl,
								'value': $('#form-email-check-input').val()
							},
			"file_str":	
							{
								'id': '#form-file-input',
								'state': this.check_img_bl,
								'value': $('#form-file-input').val()
							}
		};

		for(var prop in userData_obj)
		{
			console.log(prop.id);

			if(prop.state === false)
			{
				console.log(prop.id);
			}
		}

		return userData_obj;
	}

	/**
	 * checkForm_fn
	 * @function
	 */
	this.checkForm_fn = function ()
	{

	}
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

	/**
	 * form-btn-user-send action
	 * @function
	 */
	$('#form-btn-user-send').click(function() {
		event.preventDefault();
		
		if(true)
		{
			console.log(nouvelUtilisateur.recupFormData());
		}
		else
		{
			console.log("Formulaire non valide !");
		}
	});

	var nouvelUtilisateur = new TraitementUserCreateForm();
	nouvelUtilisateur.checkPassword_fn('#form-password-input', '#form-password-check-input');
	nouvelUtilisateur.checkEmail_fn('#form-email-input', '#form-email-check-input');
});

});


