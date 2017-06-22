/* user.js */

/**
 * Profil
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */

function Profil(_pseudo_str, _email_str, _pass_str) {
    var ici = this;
	this.id_nb;
    this.pseudo_str = _pseudo_str;
    this.email_str = (_email_str && _pass_str)?_email_str : "guess"+ici.id_nb+"@dispau.com";
    this.pass_str = _pass_str || null;
    this.prenom_str = "";
    this.nom_str = "";
    this.dateInscription_date = Date.now();
    this.image_img = [];
    this.description_str = "";

    /**
     * hydrate
     * @function
     * @param {obj} Profil
     */
    this.hydrate = function(obj) {
        for (var k in obj) {
            ici[k] = obj[k];
        }
        ici.demanderAmi = ListDemandeAmi;
    }
}

/**
 * Utilisateur
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */
 
function Utilisateur(_pseudo_str, _email_str, _pass_str) {
    this.annoncesParticipees_arr = []; //id
    this.annoncesProposees_arr = []; //id
    this.abonnementsLieux_arr = []; //id
    this.amis_arr = []; //id
    this.demandesAmis_obj = {};
    this.notificationsRecues_arr = [];
    this.abonnementsLieux_arr = [];
    this.dernierConnection = date.now();


    /**
    * demanderAmi
    * @function
    * @param {obj} Utilisateur
    */
    this.demanderAmi = function(_Utilisateur) {
    	var utile = new DemanderAmi();
    	utile.de_user = ici.id_nb;
    	utile.a_user = Utilisateur.id_nb;
    	utile.date_date = new Date.now();
    	return utile;
    }
	
    /**
    * validerDemandeAmi
    * @function
    */
    this.validerDemandeAmi = function() {
        if(ici.demandeAmi == true){
            if(validation = true){
                ici.amis_arr.push(ici.demanderAmi.a_user);
                ici.demanderAmi.a_user.amis_arr.push(ici.demanderAmi.de_user); // a verifier, test!
            }
            else{
                console.log('Validation refusé !');
            }
        }
        else{
            console.log('Demande d\'amis inexistante');
        }
    }

    /**
    * call
    * @function
    * Utilisateur herite de Profil
    * @param {} this
    * @param {string} _pseudo_str
    * @param {string} _email_str
    * @param {string} _pass_str
    */
    Profil.call(this, _pseudo_str, _email_str, _pass_str);

}

/**
 * Gestionnaire
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */
 
function Gestionnaire(_pseudo_str, _email_str, _pass_str) {
    this.annoncesGerees_arr = [];
	
	/**
     * call
     * @function
     * Gestionnaire herite de Utilisateur
     * @param {} this
     * @param {string} _pseudo_str
     * @param {string} _email_str
     * @param {string} _pass_str
     */
	Utilisateur.call(this, _pseudo_str, _email_str, _pass_str);
}

/**
 * Administrateur
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */
 
function Administrateur(_pseudo_str, _email_str, _pass_str) {
    this.lieuxAdministres_ar = [];
    this.validerAnnonce = function() {};
	
    /**
     * call
     * @function
     * Administrateur herite de Gestionnaire
     * @param {} this
     * @param {string} _pseudo_str
     * @param {string} _email_str
     * @param {string} _pass_str
     */
	Gestionnaire.call(this, _pseudo_str, _email_str, _pass_str);
}


// Controller :