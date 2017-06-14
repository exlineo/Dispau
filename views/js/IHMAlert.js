
function IHMAlert() {

/*

    Classe qui crée une notification pour l'utilisateur:

 

        Méthodes utilisables :
            this.creerAjaxAlerte : lignes[78; 84]
                Methode qui crée un message d'alerte de type requête Ajax parmis ceux déjà définis dans l'objet messageDispo.
                Elle prend en paramètre le type d'alerte que vous desirez parmis 'request', 'success' ou 'error'.
                Attention ce sont des chaines de caractères.

            this.creerChatAlerte : lignes[92; 98]
                Methode qui crée un message d'alerte de type Chat parmis ceux déjà définis dans l'objet messageDispo.
                Elle prend en paramètre le type d'alerte que vous desirez parmis 'newMessage', à definir.
                Attention ce sont des chaines de caractères.
            
            this.creerAmisAlerte : lignes[106; 112]
                Methode qui crée un message d'alerte de type demande d'Amis parmis ceux déjà définis dans l'objet messageDispo.
                Elle prend en paramètre le type d'alerte que vous desirez parmis 'newFriend', à definir.
                Attention ce sont des chaines de caractères.

        Message utilisable :
            this.messageDispo : lignes[51; 64]
                Objet contenant les différents messages. Attention ne modifier que les chaines de caractéres.
                Si vous modifiez un des types de messages, les méthodes ne fonctionneront peut-être plus.  


        ChangeLog:
            Si vous oppérez un changement dans cette classe, veuillez le montionner ici :
                ////////////////////////////////////////////////////////////////////
                    DATE : date du changement
                    LIGNES : lignes du changement
                    DESCRIPTION : description du changement
                    NOM : nom de la personne qui a effectué le changement
                ////////////////////////////////////////////////////////////////////

                ////////////////////////////////////////////////////////////////////
                    DATE : 22/05/2017
                    LIGNES : #191 à #212
                    DESCRIPTION : intégration du modèle de notifications dans le HTML
                    NOM : Patrick
                ////////////////////////////////////////////////////////////////////

                ////////////////////////////////////////////////////////////////////
                    DATE : 24/05/2017
                    LIGNES : toutes les variables
                    DESCRIPTION : correction des convention de nommage des variables 
                    NOM : Tahar
                ////////////////////////////////////////////////////////////////////

*/

                                //////////////////////////////////
                                ////// OBJET MESSAGE ALERTE //////
                                //////////////////////////////////

/*
    objet qui contient les messages d'alerte
*/

    var messageDispo = {

        //////       BDD       //////
        request : 'L\'action est en cours de traitement...',
        success : 'L\'action a été executée avec succés !',
        error : '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> L\'action en cours n\'a pas pu être effectuée.',

        //////       CHAT       //////
        newMessage : 'Vous avez reçus un message de ',
        blockMessage: 'Vous ne reçevrez plus de message de ',

        //////       FRIENDS       //////
        newFriend : 'Vous avez reçus une demande d\'amis de ',
        removeFriend : 'Vous avez supprimé de vos amis '

    }



                                //////////////////////////////////
                                //////       METHODES       //////
                                //////////////////////////////////    

/*
    Methode qui crée un message d'alerte de type requête Ajax parmis ceux déjà définis dans l'objet messageDispo.
    Elle prend en paramètre le type d'alerte que vous desirez parmis 'request', 'success' ou 'error'.
    Attention ce sont des chaines de caractères.
*/

    this.creerAjaxAlerte = function (alerteType_str) {

        var message_str = messageDispo[alerteType_str];

        this.creerMessageAlerte(message_str);

        if (alerteType_str == 'success') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType_str == 'error') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }

/*
    Methode qui crée un message d'alerte de type Chat parmis ceux déjà définis dans l'objet messageDispo.
    Elle prend en paramètre le type d'alerte que vous desirez parmis 'newMessage', à deffinir.
    Attention ce sont des chaines de caractères.
*/

    this.creerChatAlerte = function (alerteType_str, alertePseudo_str) {

        var message_str = messageDispo[alerteType_str] + alertePseudo_str;

        this.creerMessageAlerte(message_str);

        if (alerteType_str == 'newMessage') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType_str == 'blockMessage') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }

/*
    Methode qui crée un message d'alerte de type demande d'Amis parmis ceux déjà définis dans l'objet messageDispo.
    Elle prend en paramètre le type d'alerte que vous desirez parmis 'newFriend', à deffinir.
    Attention ce sont des chaines de caractères.
*/

    this.creerAmisAlerte = function (alerteType_str, alertePseudo_str) {

        var message_str = messageDispo[alerteType_str] + alertePseudo_str;

        this.creerMessageAlerte(message_str);

        if (alerteType_str == 'newFriend') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType_str == 'removeFriend') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }


/*
    Methode qui crée la popup d'alerte à partir d'une chaine de caractères.
    Ne doit pas être appelée. C'est une methode qui est uniquement utilisée 
    par les autres methodes.
*/

    this.creerMessageAlerte = function (msg_str) {

        ////// CONSTRUCTEUR HTML //////

        var $alerteConteneur_elt = $('<div/>');
        var $alerteModal1_elt = $('<div/>');
        var $alerteModal2_elt = $('<div/>');
        var $alerteModal3_elt = $('<div/>');
        var $alerteText_elt = $('<p/>');
        var $alerteClose_elt = $('<a href="#!" title="Fermer" class="close squizz" id="close-msg"><i class="fa fa-times" aria-hidden="true"></i><em>×</em></a>');
        var $site_elt = $('.content');
        
        
        $alerteConteneur_elt
            .addClass('modal-dialog dialog msg no-select')
            .appendTo($site_elt)
            .hide();

        $alerteModal1_elt
            .appendTo($alerteConteneur_elt);

        $alerteModal2_elt
            .addClass('modal')
            .appendTo($alerteModal1_elt);

        $alerteModal3_elt
            .addClass('inner-dialog')
            .appendTo($alerteModal2_elt);

        $alerteText_elt
            .addClass('notif-msg')
            .appendTo($alerteModal3_elt);

        $alerteClose_elt
            .appendTo($alerteModal3_elt);

        $(window).resize(function (){

            $alerteConteneur_elt
                .css('width', window.innerWidth);
            $alerteClose_elt
                .css('left', window.innerWidth - 40);

        });


        ////// ECRITURE DU MESSAGE //////
        
        $alerteText_elt
            .html(msg_str);


        ////// ANIMATION DE LA POPUP //////

        $alerteConteneur_elt
            .fadeIn(1000)
            .delay(5000)
            .fadeOut(1000);

        $alerteClose_elt
            .on('click', function (evt) {

                evt.preventDefault();

                $alerteConteneur_elt
                    .clearQueue()
                    .fadeOut(1000);

            });

    }

}
