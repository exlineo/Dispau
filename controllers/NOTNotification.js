


function Notification(code){
	var ici=this;
	this.messageErr=
	{
		1005: {	fr: 'Vous n\'avez pas l\'âge requis',
				en:'Your age does not allow you to register',
				de: 'Sie sind zu jung für diese Aktivität'},
		1009: { fr: 'l\'Annonce n\'a pas été validée', 
				en: 'The activity has not been validated',
				de: 'Diese Aktivität  ist nicht validiert geworden'},
		1008: { fr: 'l\'Annonce a été annulée', 
				en: 'The activity has been cancelled',
				de: 'Diese Aktivität ist abgesagt geworden'},		
		1002: { fr: 'Vous êtes bloqué pour cette Annonce', 
				en: 'You are not allowed to this activity',
				de: 'Sie sind nicht genehmigt für diese Aktivität'},
		1004: { fr: 'La date d\'inscription est dépassée', 
				en: 'The subscription time is passed',
				de: 'Die Eintragungszeit ist vorbei'},
		1006: { fr: 'Vous êtes déjà inscrit(e)', 
				en: 'You did subscribe already',
				de: 'Sie werden schon eingetragt'},
		1007: { fr: 'Vous êtes déjà inscrit(e) en liste d\'attente', 
				en: 'You did subscribe already you are in the waiting list',
				de: 'Sie werden schon eingetragt, Sie sind auf der Warteliste'},
		1001: { fr: 'L\'annonce est déjà annulée', 
				en: 'The activity has been already cancelled',
				de: 'Diese Aktivität ist schon abgesagt geworden'},
		1010: { fr: 'Le nom entré est vide', 
				en: 'The entered name is void',
				de: 'Der Name ist leer'},
		1012: { fr: 'Le nom entré est vide', 
				en: 'The entered name is void',
				de: 'Der Name ist leer'},
		1013: { fr: 'Le nom entré est vide', 
				en: 'The entered name is void',
				de: 'Der Name ist leer'},
		1014: { fr: 'Vous avez entré le même lieu', 
				en: 'You entered the same place',
				de: 'Sie haben den gleichen Ort gegeben'},
		1015: { fr: 'Nombre de personnes minimum supérieur au nombre de personnes maximum', 
				en: 'Minimum number of users greater than maximum number',
				de: 'Mindeszahl größer als Höchstzahl'},
		1018: { fr: 'La date de fin est avant la date de début', 
				en: 'Start time is after end time',
				de: 'Anfangszeit nach Endezeit'},
		1019: { fr: 'La date d\'inscription est dépassée', 
				en: 'The subscription time is passed',
				de: 'Die Eintragungszeit ist vorbei'},
		1020: { fr: 'Annonce dejà validée', 
				en: 'Activity already validated',
				de: 'Aktivität schon validiert'},
	}
	this.call(msg){
		$('#notification').text(ici.messageErr.code.langue);
		$('#notification').show();
	}
}