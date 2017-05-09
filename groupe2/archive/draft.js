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


/**
 * ready
 * @function
 */
$(document).ready(function() {

    var profil = new Profil();

    /**
     * form-btn-user-send action
     * @function
     */
    $('#form-btn-user-send').click(function(event) {
        event.preventDefault();
        var formData = profil.recupFormData();
        console.log(formData);
        profil.hydrate(formData);
        console.log(profil);
    });

});

/*--------------------------------------
    code en cours
-------------------------------------- */

// var listUtilisateur = [];
// var rempli = function(dbv) {
//     for (var k in dbv) {
//         var utilisateur = new Utilisateur();
//         utilisateur.mouille(k);
//         listUtilisateur.push(utilisateur);
//     }
// }

/**
 * DemanderAmi
 * @class
 */
// function DemanderAmi(){
//     this.de_usr;
//     this.a_usr;
//     this.date_date = new Date.now();
    
//     /**
//      * envoyeDemandeAmi
//      * @function
//      */
//     this.envoyeDemandeAmi = function(){};
    
// }

/* Connexion de l'utilisateur */
var connected = false;

function connexion()
{
    if(_pass_str && _pseudo_)
    {
        connected = true;
    }else{
        connected = false;
    }
}