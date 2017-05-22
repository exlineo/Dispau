// utilisateur identifié
	// var utilisateur_bob = {'id_nb' : 32};
	var utilisateur_moi = {'id_nb' : 10}; // a mettre dans session

// liste des chats et messages déjà créés 
	var tableau_chat = [ 1 , 2 , 3 , 4 , 5 ];
	// var tableau_messages = [
	// 		{
	// 			'id_nb' : 10,
	// 			'expediteur_nb' : utilisateur_moi.id_nb,
	// 			'contenu_str' : "Le poker c'est vraiment Super !"
	// 		},
	// 		{
	// 			'id_nb' : 15,
	// 			'expediteur_nb' : utilisateur_bob.id_nb,
	// 			'contenu_str' : "f*** the poker"
	// 		}
	// 	];


// liste des bannis
	var tableau_bannis = [];

// création d'un nouveau chat lors de la création de l'annonce
	var id_chat = tableau_chat.length + 1;
	tableau_chat.push(id_chat);

// lancement du chat
	var the_tchat = new Chat(id_chat);
	the_tchat.rafraichiMessages();
