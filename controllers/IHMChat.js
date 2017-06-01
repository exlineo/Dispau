function IHMChat(id_chat) {
	// body...

	var ici = this;

	// HERITAGE de la classe Chat() (CHAChat.js)
	Chat.call(this, id_chat);


	this.rafraichirMessages = function () {
		// body...
		var timer = setInterval(this.affichagerMessages, 3000);
	}

	this.affichagerMessages = function () {
		// body...

		// init:
		ici.getBannis();
		ici.getMessages();
		$('#messages_tchat div').remove(); // vide le chat

		for (var i = 0; i < ici.messages_ar.length; i++) {
			// l'expéditeur est-il dans le tableau des bannis?
			var testBannis = ici.bannis_ar.indexOf(ici.messages_ar[i].expediteur_nb) < 0;

			if (testBannis) {
				
				var $div = $('<div>');
				// introduit dans la data de la div l'id de l'expéditeur
				$div.data("id_nb", ici.messages_ar[i].expediteur_nb);
				

				var $contenu = $('<p>');
				if (ici.messages_ar[i].expediteur_nb == utilisateur_moi.id_nb) {
					$div.addClass("mon_message");
				}
				else
				{
					$div.addClass("autre_user");
					// // associe l'objet message à la balise
					// $div.data("message",ici.messages_ar[i]);
		

				}
				$contenu.html( "De: " + ici.messages_ar[i].expediteur_nb + "<br>" + ici.messages_ar[i].contenu_str ).appendTo($div);
				


				$div.appendTo('#messages_tchat');
				
			}


		}

		// animation lors de l'ajout d'un nouveau message
		var temp = ici.messages_ar.length * $('#messages_tchat').height();
		$('#messages_tchat').animate({ scrollTop: temp }, 1000);

		ici.evenements();
	}

}