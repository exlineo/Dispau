/* liste-users.js */

/**
 * ListeUtilisateur
 * @class
 * @param {int} _idLieu
 */

// Creer une Class liste d'utilisateur
function ListUtilisateurs(_idLieu)
{
    this.iciLU = this;
    this.list = [];
    this.idLieu = _idlieu;


    /**
     * Retrouver un idUtilisateur
     */
    this.isIn = function(idUtilisateur_nb)
    {
        while(i < iciLU.list)
        { 
            if(iciLU.list[i] == idUtilisateur_nb){
                return idUtilisateur_nb;
            }else{
                console.log("Error: Id doesn't exists");
            }
        }
    }

    /**
     * Permet de rajouter un idUtilisateur au tableau list
     * @param {int} idUtilisateur_nb
     */
    this.charge = function (idUtilisateur_nb)
    {
        if(true) // If user id existe (bdd)
        {
            return iciLU.list.push(idUtilisateur_nb) ;  
        }else{
            console.log("Error: Id doesn't exist");
        }
    }
    
    /**
     * Permet de supprimer un idUtilisateur du tableau list
     * @param {int} idUtilisateur_nb
     */
    this.decharge = function (idUtilisateur_nb)
    {
        if(iciLU.isIn(idUtilisateur_nb)){
            iciLU.list.pop(idUtilisateur_nb);
        }else{
            console.log("Error: Id dont in the list");
        }
    }

    /**
     * Réinitialiser le tableau list
     */
    this.clear = function ()
    {
        alert("Are you sure to delete list ?");
        iciLU.list = [];
    }

    /**
     * Parcourir le tableau list
     */
    this.lenght = function (idUtilisateur_nb)
    {
        while(i < iciLU.list)
        {
            if(iciLU.list[i] == idUtilisateur_nb){
                return iciLU.list.lenght;
            }else{
                console.log("Error: Id doesn't exists");
            }
            i++;
        }
    }


    var hydrateUtilisateurs = function(dbv) {
        for(var k in objet ) {
        iciLU(k) = objet(dbv);
        }
    }
    
}


