/* liste-users.js */

/**
 * ListeUsers
 * @class
 * @param {string} _pseudo_str
 * @param {string} _email_str
 * @param {string} _pass_str
 */

// Creer une Class liste d'utilisateur
var listUtilisateurs = {};

function ListUtilisateurs(_pseudo_str, _email_str, _pass_str)
{
    if(_pseudo_str && _email_str && _pass_str){
        var _pseudo_str = new Profil(_pseudo_str, _email_str, _pass_str);
        return _pseudo_str;
    }
    if(this.abonnementsLieux_arr){
        var _pseudo_str = new Utilisateur(_pseudo_str, _email_str, _pass_str);
        return _pseudo_str;
    }
    if(this.annoncesGerees_arr){
        var _pseudo_str = new Gestionnaire(_pseudo_str, _email_str, _pass_str);
        return _pseudo_str;
    }
    if(this.lieuxAdministres_ar){
        var _pseudo_str = new Administrateur(_pseudo_str, _email_str, _pass_str);
        return _pseudo_str;
    }
         
    var hydrateUtilisateurs = function(dbv) {
        for(var k in objet ) {
        listUtilisateurs.hydrate(ListUtilisateurs);
        }
    }

}
listUtilisateurs.push(ListUtilisateurs); 
