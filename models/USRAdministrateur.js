/**
 * Administrateur
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */

function USRAdministrateur(_pseudo_str, _email_str, _pass_str)
{
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