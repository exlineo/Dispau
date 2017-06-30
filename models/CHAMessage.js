/**
 * Classe Message permet de gérer les messages du chat
 * @constructor
 */
function CHAMessage() {
	// body...
	var ici = this;

	var jour = ["Jeu. ","Ven. ","Sam. ","Dim. ","Lun. ","Mar. ","Mer. "];

	/**
     * ID du message
     */
	ici.id_nb;
	/**
     * ID du chat
     */
	ici.idChat_nb;
	/**
     * date d'envoi du message
     */
	ici.date_dat;
	/**
     * contenu textuel du message
     */
	ici.contenu_str;
	/**
     * parametre du bannissement : 0 message non banni, 1 message banni
     */
	ici.banni_nb;
	/**
     * ID de l'utilisateur qui expédie le message
     */
	ici.idExpediteur_nb;
	/**
     * parametre qui permet de savoir si le message affiché appartient à l'utilisteur (true) ou non (false)
     */
    ici.msg_bool = false;
	/**
     * parametre qui renvoi un jour de la semaine
     */
	ici.jourSemaine = "";
	/**
     * Methode pour hydrater la classe
     */
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

	};
	/**
     * Methode qui définit si l'utilisateur peut bannir un message -- non utilisée à présent
     */
	this.admin = function () {
		// Renvoi un bouléen pour identifier un administrateur
		return utilisateur_moi.grade_nb > 1;
	}	


};