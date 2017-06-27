/**
 * Created by gaelph on 27/06/2017.
 */

function Emetteur ($rootScope) {
    var _instance = this;

    this.when = function (nomEvenement_str, callback) {
        $rootScope.$on(nomEvenement_str, callback);
    };

    this.emettre = function (nomEvenement_str) {
        $rootScope.$emit(nomEvenement_str);
    };
}
