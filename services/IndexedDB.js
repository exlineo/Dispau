/**
 * METTRE A JOUR PAR RAPPORT A BDD
 * RENOMMER DEXIE EN INDEXEDDB
 */

/**
 * Service pour le wrapper IndexedDB Dexie.js
 * @return {Dexie}
 */
function IndexedDB() {

    /**
     * Liste des stores
     * @type {{1: {photos: string}, 2: {photos: string, requests: string}, 3: {photos: string, requests: string}, 4: {photos: string, requests: string, testcases: string}, 5: {photos: string, requests: string, testcases: string}, 6: {photos: string, requests: string, testcases: string}, 7: {photos: string, requests: string, testcases: string}}}
     */
    var databaseDeclarations = {

        {
            "photos":    "key, value, modifications",
            "requests":  "++id, method, url, body, timestamp",
            "testcases": "&id, nom, description, numero, date, modifications"
        }
    };

    // chargement de la base de données
    var db = new Dexie("Dispau_db");

    // Chargement itératif des stores

    db.version(7).stores(databaseDeclarations[7]);

    console.log("Loaded db version " + 7);

    // On renvoie l'instance de Dexie.
    return db;
}