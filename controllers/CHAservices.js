// ajaxGet: gère les requetes AJAX.
// miseEnForme: met en forme le tableau d'objet produit par la requete AJAX



var services = angular.module('services', []);

services.factory('ajaxChat', [ '$http', function ($http) {
	// body...

    var ici = this;
	this.ajaxGet = function (obj_str, req_str) {
		// body...
        var url = '../controllers/CHAgestion.php?obj='+ obj_str +'&' + req_str;

		return $http.get(url)
          .then(
            function (response) {
            	return response.data;
            },

            function (response) {
              // body...
              console.log("Erreur: " + response)
            })
	}



	this.miseEnForme = function (respTab) {
		// body...
	    var sortieTab = [];

	    for (var i = 0; i < respTab.length; i++) {
	        	var temp_obj = {};
	        	temp_obj.expediteur_nb = respTab[i]['EXP_NB'];
	        	temp_obj.contenu_str = respTab[i]['CONTENU'];
	        	temp_obj.id_nb = respTab[i]['ID_NB'];
	        	sortieTab.push(temp_obj);
	        } 

        // ajout de la propriété test pour l'affichage     
        for (var i = 0; i < sortieTab.length; i++) {
              var temp_bl = sortieTab[i].expediteur_nb == utilisateur_moi.id_nb;
              sortieTab[i].test = temp_bl ? 'moi' : 'autre';
            }

	    // tri du sortieTableau par date c-a-d par id_nb
        for (var j = 0; j < sortieTab.length; j++) {
            
            for (var i = sortieTab.length - 1; i > j; i--) {
                if (sortieTab[i-1].id_nb > sortieTab[i].id_nb) {
                  var stock = sortieTab[i];
                  sortieTab[i] = sortieTab[i-1];
                  sortieTab[i-1] = stock;
                }
              }
            }
	    return sortieTab;
		}

	return this;

}])	
