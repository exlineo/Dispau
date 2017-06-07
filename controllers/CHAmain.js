// utilisateur identifié	
var utilisateur_moi = {'id_nb' : 8, 'grade_nb' : 1}; // a mettre dans session

// chat identifié
var id_chat = 2;

// mise à zéro de l'historique du chat
sessionStorage.removeItem('chat');

////////////////////////////////////////////////////
var app = angular.module('monChat', ['services']);

app.controller('affichage', ['ajaxChat', function (ajaxChat) {
	// body...
	var ici = this;
	setInterval(function () {
		var requete_str = 'chat=' + id_chat;
		ajaxChat.ajaxGet('lecture', requete_str)
			.then(function (response) {
				// body...
				if(response.length > 0)
				{
					var temp1 = ajaxChat.miseEnForme(response);
					var temp2 = ajaxChat.stockerHistorique(temp1);
					ici.messages = temp2;
					
				}

			})

	}, 5000);

	this.admin = function () {
		// body...
		return utilisateur_moi.grade_nb > 1;
	}

	this.toucheEntree = function (event) {
		// body...
		if( event.keyCode == 13 )
		{
			ici.envoyer();
		}
	}

	this.envoyer = function () {
		// body...
		var requete_str = 'id_chat=' + id_chat;
		requete_str += '&exp_nb=' + utilisateur_moi.id_nb;
		requete_str += '&contenu=' + ici.texte;
		
		ajaxChat.ajaxGet('ecriture', requete_str)
			.then(function (response) {
				// body...
			})

		ici.texte = "";
	}

	this.bannir = function (id_nb) {
		// body...
		var requete_str = 'chat=' + id_chat;
		requete_str += '&exp=' + id_nb;
		// console.log(requete_str)

		ajaxChat.ajaxGet('bannir', requete_str)
			.then(function (response) {
				// body...
			})
	}


}])
