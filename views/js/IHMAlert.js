
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

    this.creerAjaxAlerte = function (alerteType) {

        var message = messageDispo[alerteType];

        this.creerMessageAlerte(message);

        if (alerteType == 'success') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType == 'error') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }

/*
    Methode qui crée un message d'alerte de type Chat parmis ceux déjà définis dans l'objet messageDispo.
    Elle prend en paramètre le type d'alerte que vous desirez parmis 'newMessage', à deffinir.
    Attention ce sont des chaines de caractères.
*/

    this.creerChatAlerte = function (alerteType, alertePseudo) {

        var message = messageDispo[alerteType] + alertePseudo;

        this.creerMessageAlerte(message);

        if (alerteType == 'newMessage') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType == 'blockMessage') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }

/*
    Methode qui crée un message d'alerte de type demande d'Amis parmis ceux déjà définis dans l'objet messageDispo.
    Elle prend en paramètre le type d'alerte que vous desirez parmis 'newFriend', à deffinir.
    Attention ce sont des chaines de caractères.
*/

    this.creerAmisAlerte = function (alerteType, alertePseudo) {

        var message = messageDispo[alerteType] + alertePseudo;

        this.creerMessageAlerte(message);

        if (alerteType == 'newFriend') {
            $('.notif-msg')
                .css('color', 'green');
        }

        if (alerteType == 'removeFriend') {
            $('.notif-msg')
                .css('color', 'red');
        }

    }


/*
    Methode qui crée la popup d'alerte à partir d'une chaine de caractères.
    Ne doit pas être appelée. C'est une methode qui est uniquement utilisée 
    par les autres methodes.
*/

    this.creerMessageAlerte = function (msg) {

        ////// CONSTRUCTEUR HTML //////

        var $alerteConteneur = $('<div/>');
        var $alerteModal1 = $('<div/>');
        var $alerteModal2 = $('<div/>');
        var $alerteModal3 = $('<div/>');
        var $alerteText = $('<p/>');
        var $alerteClose = $('<a href="#!" title="Fermer" class="close squizz" id="close-msg"><i class="fa fa-times" aria-hidden="true"></i><em>×</em></a>');
        var $site = $('.content');
        
        
        $alerteConteneur
            .addClass('modal-dialog dialog msg no-select')
            .appendTo($site)
            .hide();

        $alerteModal1
            .appendTo($alerteConteneur);

        $alerteModal2
            .addClass('modal')
            .appendTo($alerteModal1);

        $alerteModal3
            .addClass('inner-dialog')
            .appendTo($alerteModal2);

        $alerteText
            .addClass('notif-msg')
            .appendTo($alerteModal3);

        $alerteClose
            .appendTo($alerteModal3);

        $(window).resize(function (){

            $alerteConteneur
                .css('width', window.innerWidth);
            $alerteClose
                .css('left', window.innerWidth - 40);

        });


        ////// ECRITURE DU MESSAGE //////
        
        $alerteText
            .html(msg);


        ////// ANIMATION DE LA POPUP //////

        $alerteConteneur
            .fadeIn(1000)
            .delay(5000)
            .fadeOut(1000);

        $alerteClose
            .on('click', function (evt) {

                evt.preventDefault();

                $alerteConteneur
                    .clearQueue()
                    .fadeOut(1000);

            });

    }

}
