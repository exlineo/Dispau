function DemandeAmi(){
    var da = this;
    this.de_user = de_id;
    this.a_user = a_id;
    this.date = _date;
    this.status = false;

     /**
     * Recuperer toute les informations relatif d'un utilisateur via son l'id
     */
    // this.recupererInformationDunUtilisateur = function(idUtilisateur_nb){
    //     if(ici.Utilisateur.id_nb == idUtilisateur_nb){
    //         for(var r = 0; r < ici.Utilisateur.length; r++){
    //             var stockInformationUser = [];
    //             stockInformationUser.push(Utilisateur[r]);
    //         }
    //     }else{
    //         return false;
    //     }
    // }
	
    /**
     * validerDemandeAmi
     * @function
     */
    this.validerDemandeAmi = function(validation) {
        if(ici.demandeAmi == true){
            if(validation = true){
                ici.amis_arr.push(ici.demanderAmi.a_user);
                ici.demanderAmi.a_user.amis_arr.push(ici.demanderAmi.de_user); // a verifier, test!
            }else{
                console.log('Validation refusé !');
            }
        }else{
            console.log('Demande d\'amis inexistante');
        }
    };
    
    /**
     * onNotificationRecue
     * @function
     */
    this.onNotificationRecue = function requestPermission(pseudo_str, date_date) {
        // Verifier si l'utilisateur accepter les notification
        if(window.Notification && Notification.permission !== "granted"){
            Notification.requestPermission(function(status){
                if(Notification.requestPermission !== status){
                    Notification.permission = status;
                }
            })
        }
        if(window.Notification && Notification.permission !== "granted"){
            var notificationAmi = new Notification('Demande d\'ami', {
            body: _pseudo_str + " souhaite devenir votre ami.",
            icon: src="../img/iconNotification.png",
            tag: date
            });
        }
    };
}