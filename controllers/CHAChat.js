
function Chat(id_chat) {
	// body...
	this.id_nb = id_chat;	
	this.messages_ar = [];
	this.bannis_ar = [];

	this.getMessages = function () {
		// body...
		this.messages_ar = tableau_messages; //remplir avec les messages contenus dans la bdd
	}

	this.setBannis = function (id_nb) {
		// body...
		console.log(id_nb," est banni!");
		// transmettre dans le tableau des bannis
		if (this.bannis_ar.indexOf(id_nb) < 0) {
			// this.bannis_ar.push(id_nb);
	
			tableau_bannis.push(id_nb); // transmis à la base de données
			
		}
	}

	this.getBannis = function () {
		// body...
		this.bannis_ar = tableau_bannis;
	}

	this.evenements = function () {
		// body...
		// évènements


		$('#valider-btn').on('click', function () {
			// body...
			console.log('click');
			var mes = new Message(the_tchat);
			mes.contenu_str = $('#message-input').val();
			console.log(mes.contenu_str);
			mes.expediteur_nb = utilisateur_moi.id_nb;
			console.log(mes.expediteur_nb);
			mes.transmettre_BDD();

			mes.update();
		

		});

		$('#messages_tchat div').on('dblclick', function () {
			// body...
			if ($(this).data().id_nb != utilisateur_moi.id_nb) {
				the_tchat.setBannis($(this).data("id_nb"));
			}
		})


	}

	this.affichageMessages = function () {
		// body...

		// init:
		this.getMessages(); //hydratation
		this.getBannis();
		$('#messages_tchat div').remove();


		for (var i = 0; i < this.messages_ar.length; i++) {
			console.log("taille= ", this.messages_ar.length);
			// l'expéditeur est-il dans le tableau des bannis?
			var testBannis = this.bannis_ar.indexOf(this.messages_ar[i].expediteur_nb) < 0;

			if (testBannis) {
				var $div = $('<div>');
				// introduit dans la data de la div l'id de l'expéditeur
				$div.data("id_nb", this.messages_ar[i].expediteur_nb);
				var $p = $('<p>');
				
				if (this.messages_ar[i].expediteur_nb == utilisateur_moi.id_nb) {
					$div.addClass("mon_message");
				}
				else
				{
					$div.addClass("autre_user");
					// associe l'objet message à la balise
					$div.data("message",this.messages_ar[i]);
		

				}
				$p.html( this.messages_ar[i].contenu_str );
				$p.appendTo($div);
				$div.appendTo('#messages_tchat');
				
			}


		}

		var temp = this.messages_ar.length * $('#messages_tchat').height();
		$('#messages_tchat').animate({ scrollTop: temp }, 1000);

		this.evenements();
	}






}