/**
*ListDemandeAmi
*@class
*/
function ListDemandeAmi()
{
    var lda = this;
    this.list = [];

/**
* Rajouter une demande
*@param {obj} demandeAmi
*/
    this.add = function(demandeAmi)
    {
        lda.list.push(demandeAmi);
    }

/**
* Rechercher une demande
*@param {obj} demandeAmi
*/
    this.searchDemande = function(demandeAmi)
    {
        for(var i = 0; i < lda.list.length; i++){
             if((lda.list[i].de_user == demandeAmi.de_user)
             && (lda.list[i].a_user == demandeAmi.a_user)
             && (lda.list[i].date == demandeAmi.date)){
                    return i;
             }
        }
        return false;
    }

/**
* Verifier l'existance d'une demande
*@param {obj} demandeAmi
*/
    this.exist = function(demandeAmi)
    {
            if((lda.list[i].de_user == demandeAmi.de_user)
            && (lda.list[i].a_user == demandeAmi.a_user))
            {
                return true;
            }else{
                return false;
            }
    }

/**
* Supprimer une demande
*@param {obj} demandeAmi
*/
    this.remove = function(demandeAmi)
    {
        var i = searchDemande(demandeAmi);
        if(i !== false)
        {
            delete lda.list[i](demandeAmi);
        }
    }

/**
* Retourner un tableau de demande d'ami pour
*@param {init} id_a_user, param
*/
    this.searchById = function(id_user)
    { 
    var list = [];
            for(var k = 0; k < lda.list.length; k++)
            {
                if(lda.list[i].a_user == id_user || lda.list[i].de_user == id_user)
                {
                    list.push(lda.list[i]);
                }
    }
        return list;
        }
                var list = [];
            for(var k = 0; k < lda.list.length; k++)
            {
                if(lda.list[i].de_user == demandeAmi.de_user)
                {
                    list.push(lda.list[i].a_user);
                }
            }
        return list;
        }else{
            console.log("Syntaxe Error : [int]");
            return [];
        }
    }
}