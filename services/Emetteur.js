/**
 * Created by gaelph on 27/06/2017.
 */

function Emetteur () {
    var _instance = this;

    var ecouteurs = {};

    this.when = function (nomEvenement_str, callback) {
        if (!ecouteurs.hasOwnProperty(nomEvenement_str)) {
            ecouteurs[nomEvenement_str] = [];
        }

        ecouteurs[nomEvenement_str].push(callback);
    };

    this.emettre = function (nomEvenement_str) {
        var args = arguments.splice(0, 1);

        ecouteurs[nomEvenement_str].map(function (ecouteur) {
            ecouteur(args);
        });

    };
}
