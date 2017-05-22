
function Message(chat_id) {
	// body...
	// Propriétés:
	// id_nb : identifiant du message créé lors de l'envoi.
	// expediteur_nb : identifiant de l'expéditeur.
	// destinataire_nb : id du chat auquel est associé le message.
	// contenu_str : contenu du message.

	// Méthodes:
	// transmettre_BDD : transmet l'objet message sur la bdd.
	// update : recupère les messages de la bdd et rafraichi l'affichage.

function setAjaxRequest(my_method, my_url, my_data, callback) {
	$.ajax({ 
		method : my_method, 
		url : my_url,
 		data : my_data,

		success : function(response, status, request) 
			{ 
				callback(response);

			 }, 
		
		error : function(request, status, error) 
			{ console.log(error); } 

		}); 

}
	var ici = this;
	this.id_nb = Date.now();
	this.expediteur_nb = 0;
	this.destinataire_nb = chat_id;
	this.contenu_str = "";
	// this.statut_mst = "NON_LU";

	this.transmettre_BDD = function () {
		// body...
		if (this.contenu_str != "") {
			my_data = { 'obj':'ecriture',
					 'id_chat' : this.destinataire_nb,
					 'id_nb' : this.id_nb,
					 'exp_nb' : this.expediteur_nb,
					 'contenu' : this.contenu_str };
			my_url = '../controllers/CHAgestion2.php';
			console.log(my_data)

			setAjaxRequest( 'POST', my_url, my_data, 
				function (response) {});
					
		}
		
	}
	

}