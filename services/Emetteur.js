/**
 * Created by gaelph on 27/06/2017.
 */

/**
 *
 * @param $rootScope
 * @constructor
 */
function Emetteur ($rootScope) {
    var _instance = this;

    /**
     *
     * @param nomEvenement_str
     * @param callback
     */
    this.when = function (nomEvenement_str, callback) {
        $rootScope.$on(nomEvenement_str, callback);
    };

    /**
     *
     * @param nomEvenement_str
     */
    this.emettre = function (nomEvenement_str, object) {
        $rootScope.$emit(nomEvenement_str, [object]);
    };

    return this;
}
