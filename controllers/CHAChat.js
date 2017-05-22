
function Chat(id_chat) {
	// // 
	// Propriétés:

	// id_nb : identifiant du chat. Il est unique par chat. Il doit être créé lors de l'instanciation d'un chat.
	// messages_ar : tableau contenant les messages associés à ce chat.
	// bannis_ar : tableau contenant les identifiants des expéditeurs bannis sur ce chat.

	// Méthodes:

	// setBannis : ajoute l'id de l'expéditeur dans le tableau des bannis s'il ne s'y trouve pas encore.
	// getBannis : récupère le tableau des expéditeurs bannis associés à ce chat.
	// getMessages : récupère le tableau des messages associés à ce chat et trie les messages par date (id_nb du message).
	// evenements : gestion de l'envoi du message et du bannissement.
	// rafraichiMessages : lance régulièrement l'affichage des messages.
	// affichageMessages : affiche et anime l'apparition des messages dans le chat.

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
	this.id_nb = id_chat;	
	this.messages_ar = [];
	this.bannis_ar = [];
	this.begaie = true;

	this.setBannis = function (id_nb) {
		// body...
		console.log(id_nb + " est banni!");
		// transmettre dans le tableau des bannis
		if (this.bannis_ar.indexOf(id_nb) < 0) {
			// this.bannis_ar.push(id_nb);
	
			tableau_bannis.push(id_nb); // transmis à la base de données
			
		}
		// rafraichi le chat
		this.getMessages();
	}

	this.getBannis = function () {
		// body...
		this.bannis_ar = tableau_bannis; //remplir avec les id des bannis
		// PREVOIR d'utiliser l'id du chat pour la requete.
	}

	this.getMessages = function () {
		// body...
		my_data = { 'obj':'lecture', 'chat' : id_chat };
		my_url = '../controllers/CHAgestion.php';
		setAjaxRequest( 'POST', my_url, my_data, function (response) {
			// body...
			// traitement de la réponse
			var temp = response.indexOf('[{');
			response = response
						.substring(temp)
						.replace(/ID_NB/g,'id_nb')
						.replace(/EXP_NB/g,'expediteur_nb')
						.replace(/CONTENU/g,'contenu_str');

			console.log(response);
			var tab = JSON.parse(response);
			
			// var tab = tableau_messages; //remplir avec les messages contenus dans la bdd
			// PREVOIR d'utiliser l'id du chat pour la requete.

			// tri du tableau par date c-a-d par id_nb
			for (var j = 0; j < tab.length; j++) {
			
				for (var i = tab.length - 1; i > j; i--) {
					if (tab[i-1].id_nb > tab[i].id_nb) {
						var temp = tab[i];
						tab[i] = tab[i-1];
						tab[i-1] = temp;
					}
				}
			}

			ici.messages_ar = tab;
			// ici.affichageMessages();
		});

	}


	this.evenements = function () {
		// body...
		// évènements

		// envoi du message sur le chat par un clic sur le bouton valider
		$('#valider-btn').on('click', function () {
			// body...

			//previent le bégaiement du clic
			if(ici.begaie){
				ici.begaie = false;
				setTimeout(function(){ ici.begaie = true; }, 500);

				var mes = new Message(the_tchat.id_nb);
				mes.contenu_str = $('#message-input').val();
				mes.expediteur_nb = utilisateur_moi.id_nb;
				mes.transmettre_BDD();
				$('#message-input').val("");
				// rafraichi le chat
				ici.getMessages();
				
			}

		});

		// bannissement d'un expéditeur par un double clic sur le message
		// Voir le niveau de l'utilisateur
		$('#messages_tchat div').on('dblclick', function () {
			// body...
			if ($(this).data().id_nb != utilisateur_moi.id_nb) {
				the_tchat.setBannis($(this).data("id_nb"));
			}
		})


	}

	this.rafraichiMessages = function () {
		// body...
		var timer = setInterval(this.affichageMessages, 3000);
	}

	this.affichageMessages = function () {
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