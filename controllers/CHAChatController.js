/**
* @param {DBManager} dbManager  Le service d'accès au serveur
* @constructor
*/
function CHAChatController (dbManager, $routeParams) {
    var ici = this;
    
    /**
     * Identifiant du chat
     * @type {number}
     */
    this.idChat = $routeParams.idChat;

    /**
     * Notre modèle de données des instances de CHAMessage
     * @type {CHAMessage[]}
     * @default []
     */
    this.messages = [];
    // Récupération limitée des messages (5)

    setInterval(function () {

    var messageManager = dbManager('CHAMessage');
    messageManager
    .all()
    .where('idChat_nb')
    .equals(ici.idChat)
    .and('banni_nb')
    .equals(0)
    .orderBy('date_dat', 'desc')
    .limit(5)

    .then(function (messages) {
        // messages est un tableau contenant
        // des instances de CHAMessage
      if (messages.length == 0) {
        // Message d'accueil si aucun message dans le chat
        document.getElementsByClassName("messagesChat")[0].display = 'none';

      } else {

        document.getElementsByClassName("messagesChat")[0].display = 'contents';

        var temp = ici.stockerHistorique(messages);
        ici.messages = temp; // Stockage des messages réçus de l'hydratation depuis DBManager
        console.log(temp);
        // crée et déclenche l'événement
        setTimeout(function () {
          // body...
          // scroll placé en bas du chat
          document.getElementsByClassName("modal")[0].scrollTop += 10000;
        }, 100);
        
      }



    })
    .catch(function (error) {}); 

    }, 5000);

    ///////////////
    // Envoi  le message sur la touche entrée du clavier
    this.toucheEntree = function (event) {
		// Validation du formulaire par la touche Entrée
		  if( event.keyCode == 13 )
        {
          ici.enregistrerMessage();
        }
	  }

    // Enregistrement du message sur la bdd
    this.enregistrerMessage = function () {

        // on vide le textarea
        document.getElementsByTagName('textarea')[0].value = "";

        // scroll placé en bas du chat
        document.getElementsByClassName("modal")[0].scrollTop += 10000;


        var messageManager = dbManager('CHAMessage');
        // La variable message doit contenir une instance de CHAMessage
        var nouvMessage = {};
        nouvMessage['idChat_nb'] = ici.idChat;
        nouvMessage['idExpediteur_nb'] = utilisateur_moi.id_nb;
        nouvMessage['contenu_str'] = ici.texteAExpedier;
        nouvMessage['date_dat'] = Date.now();

        messageManager
        .save(nouvMessage)
          .then(function (message) {
            //  ici.messages.push(message);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    this.stockerHistorique = function (ajax_ar) {
    // teste si la réponse est vide
    if (ajax_ar.length < 1) {
      return [{ '@ban' : 0 }];

    } else {
        // inversion du tableau ajax_ar pour que le message le plus récent soit en fin de tableau
      if (ajax_ar.length % 2 == 0) {
        for (var i = 0; i < (ajax_ar.length / 2); i++) {
          var temp = ajax_ar[i];
          ajax_ar[i] = ajax_ar[ajax_ar.length - 1 - i];
          ajax_ar[ajax_ar.length - 1 - i] = temp;
        }
        // Impair:
      } else {
        for (var i = 0; i < ((ajax_ar.length - 1) / 2); i++) {
          var temp = ajax_ar[i];
          ajax_ar[i] = ajax_ar[ajax_ar.length - 1 - i];
          ajax_ar[ajax_ar.length - 1 - i] = temp;
        }
      }

      // Récupération du storage
      var stock_str = sessionStorage.getItem('chat');
      if (!stock_str) {
        // si le session storage est vide
        stock_str = JSON.stringify(ajax_ar);
        sessionStorage.setItem('chat', stock_str);
      } else {
        var stock_ar = JSON.parse(stock_str);
        if (stock_ar.length > 4) {
          // on récupère le message le plus récent du storage
          var dernier_obj = stock_ar[stock_ar.length - 1];
          // on le compare avec les messages de l'Ajax 
          for (var i = 0; i < 5; i++) {
              if (ajax_ar[i].id_nb == dernier_obj.id_nb) {
                    for (var j = i+1; j < 5; j++) {
                        stock_ar.push(ajax_ar[j]);
                    }
              } 
            }
          stock_str = JSON.stringify(stock_ar);
          sessionStorage.setItem('chat', stock_str);        
        } 
        else {
          stock_str = JSON.stringify(ajax_ar);
          sessionStorage.setItem('chat', stock_str);        
        }
    }

    return JSON.parse(sessionStorage.getItem('chat'));
  
    }
    
  }


}

