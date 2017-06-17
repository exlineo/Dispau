/**
 * Created by gaelph on 15/06/2017.
 */

var app = angular.module('dispau-app', ['ngRoute', 'uiGmapgoogle-maps']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBkm4blthirzCbZy1wy6GwUtxLC_jGW9rI&amp',
        //v: '3.25', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
/*

app.factory('ConnectionServeur', ['$http', ConnectionServeur]);
app.factory('NotificationService', ['$http', NotificationService]);
app.factory('RegexService', [RegexService]);

*/

/*app.controller('ANNAnnonceController', ['ConnectionServeur', ANNAnnonceController]);
app.controller('ANNAnnonceListe', ['ConnectionServeur', ANNAnnonceListe]);
app.controller('ANNCentreInteretListe', ['ConnectionServeur', ANNCentreInteretListe]);
app.controller('CHAChatController', ['ConnectionServeur', CHAChatController]);
app.controller('LIELieuController', ['ConnectionServeur', LIELieuController]);
app.controller('LIELieuListe', ['ConnectionServeur', LIELieuListe]);
app.controller('USRDemandeAmiListe', ['ConnectionServeur', USRDemandeAmiListe]);
app.controller('USRLogin', ['ConnectionServeur', USRLogin]);
app.controller('USRUtilisateurController', ['ConnectionServeur', USRUtilisateurController]);
app.controller('USRUtilisateurListe', ['ConnectionServeur', USRUtilisateurListe]);*/
app.controller('MAPMap', ['uiGmapGoogleMapApi', '$scope', MAPMap]);

