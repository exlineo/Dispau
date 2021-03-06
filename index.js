/**
 * Created by gaelph on 15/06/2017.
 */

app.module('dispau-app', ['ngRoute']);

app.factory('ConnectionServeur', ['$http', ConnectionServeur]);
app.factory('NotificationService', ['$http', NotificationService]);
app.factory('RegexService', [RegexService]);

app.controller('ANNAnnonceController', ['ConnectionServeur', ANNAnnonceController]);
app.controller('ANNAnnonceListe', ['ConnectionServeur', ANNAnnonceListe]);
app.controller('ANNCentreInteretListe', ['ConnectionServeur', ANNCentreInteretListe]);
app.controller('CHAChatController', ['ConnectionServeur', CHAChatController]);
app.controller('LIELieuController', ['ConnectionServeur', LIELieuController]);
app.controller('LIELieuListe', ['ConnectionServeur', LIELieuListe]);
app.controller('USRDemandeAmiListe', ['ConnectionServeur', USRDemandeAmiListe]);
app.controller('USRLogin', ['ConnectionServeur', USRLogin]);
app.controller('USRUtilisateurController', ['ConnectionServeur', USRUtilisateurController]);
app.controller('USRUtilisateurListe', ['ConnectionServeur', USRUtilisateurListe]);
