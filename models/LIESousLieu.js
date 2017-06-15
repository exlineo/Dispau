/**
 *
 * @constructor
 */

function LIESousLieu()
{

    /////// Propriétés ///////


    /**
     * Identifiant du sous-lieu
     * @type {number}
     * @default 0
     */
    this.id_nb = 0;

    /**
     * Nom du lieu
     * @type {string}
     * @default ''
     */
    this.nom_str = '';

    /**
     * Identifiant du lieu parent
     * @type {number}
     * @default 0
     */
    this.lieuParent_nb = 0;

    /**
     * Identifiant du lieu principal
     * @type {number}
     * @default 0
     */
    this.lieuPrincipal_nb = 0;
}