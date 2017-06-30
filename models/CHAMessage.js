function CHAMessage() {
	// body...
	var ici = this;
	var jour = ["Jeu. ","Ven. ","Sam. ","Dim. ","Lun. ","Mar. ","Mer. "];

	ici.id_nb;
	ici.idChat_nb;
	ici.date_dat;
	ici.contenu_str;
	ici.banni_nb;
	ici.idExpediteur_nb;
	ici.msg_bool = false;
	ici.jourSemaine = "";

	ici.hydrater = function (obj) {
		// body...
		for (var i in obj) {
			this[i] = obj[i];
		}
		// teste si l'expéditeur est l'utilisateur de l'appli ou non
		if(ici.idExpediteur_nb == utilisateur_moi.id_nb){
			ici.msg_bool = true;
		}
		// calcul du jour de la semaine
		var date = (Math.floor(ici.date_dat / 1000 / 3600 / 24) % 7);
		ici.jourSemaine = jour[date];
		console.log(ici);

	};


	this.admin = function () {
		// Renvoi un bouléen pour identifier un administrateur
		return utilisateur_moi.grade_nb > 1;
	}	


};