/**
 * SLUG A MODIFIER
 */

/**
 * Manager pour la base de données locale (indexedDB)
 * @param {IndexedDB} indexedDB
 * @constructor
 */
function IndexedDBManager (className, indexedDB) {
    var _instance = this;

    this._limit = -1;
    this._whereClause = [];

    /**
     * Renvoie le nom de la table pour la classe donnée
     * @param {string} className    Le nom de la classe
     * @return {string} Le nom de la table
     * @private
     */
    this._slug = function (className) {
        return className.substr(3).toLowerCase();
    };

    this.limit = function (l) {
        this._limit = (l);
        return this;
    };

    this._decoratePromise = function (promise) {
        promise.where = function (champ) {
            _instance._whereClause.push({
                clause : 'where',
                champ :  champ
            });
            return promise;
        };

        promise.and = function (champ) {
            if (_instance._whereClause.length > 0) {
                _instance._whereClause.push({
                    clause : 'and',
                    champ :  champ
                });
            } else {
                throw "On ne peut pas utiliser and() sans avoir utilisé where() d'abord";
            }
            return promise;
        };

        promise.or = function (champ) {
            if (_instance._whereClause.length > 0) {
                _instance._whereClause.push({
                    clause : 'or',
                    champ :  champ
                });
            } else {
                throw "On ne peut pas utiliser or() sans avoir utilisé where() d'abord";
            }
            return promise;
        };

        function comparaison (clause, comparaison, valeur) {
            clause.comparaison = comparaison;
            clause.valeur = valeur;
            return clause;
        }

        promise.equals = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'equals', value);
            } else {
                throw "On ne peut pas utiliser equals() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        promise.above = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'above', value);
            } else {
                throw "On ne peut pas utiliser above() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        promise.below = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'below', value);
            } else {
                throw "On ne peut pas utiliser below() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        promise.not = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'not', value);
            } else {
                throw "On ne peut pas utiliser not() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        /**
         * Détermine l'ordre des résultats
         * @param {string}  champ               Le champs sur lequel trier
         * @param {string}  [order=asc|desc]    L'ordre de tri
         */
        promise.orderBy = function (champ, order) {
            _instance._whereClause.push({
                clause : 'order by',
                valeur : champ,
                order : order
            });
        };

        promise.limit = function (value) {
            _instance._whereClause.push({
                clause : 'limit',
                valeur : value
            });
            return promise;
        };

        return promise;
    };

    /**
     * Récupère un élément
     * @param {string} className    Le nom de la classe
     * @param {number} id           L'identifiant de l'élément à récupérer
     * @returns {Promise}           Une promise qui résout à l'instance de l'objet récupéré
     */
    this.get = function (id) {
        return new Promise(function (resolve, reject) {
            resolve(indexedDB[_instance._slug(className)].where('id_nb').equals(id).first());
        });
    };

    /**
     * Récupère tous les éléments de la table
     * @param {string} className    Le nom de la classe des objets à récupérer
     * @return {Promise}            Une promise qui résout à une collection d'objets
     */
    this.all = function () {
        if (this._whereClause.length > 0) {
            return this._decoratePromise(new Promise(function (resolve) {
                setTimeout(function () {
                    var slug = _instance._slug(className);
                    var collection = indexedDB[slug];

                    _instance._whereClause.map(function (item) {
                        if (item.hasOwnProperty('comparaison')) {
                            var comparaison = item.comparaison === 'not' ? 'notEqual' : item.comparaison;
                            collection = collection[item.clause](item.champs)[comparaison](item.valeur);
                        } else if (item.clause === 'limit') {
                            collection = collection[item.clause](item.valeur);
                        } else if (item.clause === 'order by') {
                            collection = collection.sortBy(item.champ);
                            if (item.order === 'desc') {
                                collection = collection.reverse();
                            }
                        }
                    });

                    resolve(collection);
                }, 10);
            }));
        } else {
            return this._decoratePromise(new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(indexedDB[_instance._slug(className)].toCollection());
                }, 10);
            }));
        }
    };

    /**
     * Persiste un enregistrement dans la base
     * @param {string} className    Le nom de la classe de l'objet à persister
     * @param {object} object       L'objet à persisiter
     * @return {Promise}            Une promise qui résout à l'objet enregistré
     */
    this.save = function (object) {
        return new Promise(function (resolve, reject) {
            // On détermine la clé primaire de l'objet
            var id = object.id_nb;
            // Si l'objet a une clé primaire
            if (id !== null) {
                // On vérifie l'exitence de l'objet dans la base
                _instance.get(id)
                    .then(function (currentObject) {
                        // Si l'objet exite, currentObject est la versio en base (obsolète)
                        // Sinon, c'est "undefined"
                        if (typeof currentObject !== 'undefined') {
                            // On prend les modifications (timestamps) de la base
                            object.modifications = currentObject.modifications;

                            // On regarde qu'est-ce qui a changé et on actualise le timestamp
                            for (var prop in object) {
                                if (object.hasOwnProperty(prop) && currentObject.hasOwnProperty(prop)) {
                                    if (object[prop] !== currentObject[prop]) {
                                        object.modifications[prop] = +new Date();
                                    }
                                }
                            }
                        } else { // Pas d'objet existant
                            // On crée la valeur initiale des timestamp de modification
                            for (var prop in object) {
                                if (object.hasOwnProperty(prop)) {
                                    object.modifications[prop] = +new Date();
                                }
                            }
                        }

                        // Insertion / Mise à jour dans la base
                        indexedDB[_instance._slug(className)].put(object)
                            .then(resolve)
                            .catch(reject);
                    });
            } else {
                // Si l'objet utilise le log 'modifiations', on initialise celui-ci
                if (typeof object.modifications !== 'undefined') {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            object.modifications[prop] = +new Date();
                        }
                    }
                }
                // On donne une valeur à id pour statisfaire indexedDB
                object.id_nb = 0;

                // Insertion dans la base
                indexedDB[_instance._slug(className)].put(object)
                    .then(resolve)
                    .catch(reject);
            }
        });
    };

    /**
     * Persite une collection d'objets
     * @param {string} className    nom de la classe d'objets
     * @param {Array} data          Tableau contenant les objets à insérer
     * @return {Promise<Key>|*}
     */
    this.bulkSave = function (data) {
        return indexedDB[_instance._slug(className)].bulkPut(data);
    };

    /**
     * Supprime un enregistrement de la base de données
     * @param {string} className    Le nom de la classe concernée
     * @param {number} id           L'identifiant de l'enregistrement à supprimer
     * @returns {Promise}           Un promise qui résout à l'id de l'objet supprimé
     */
    this.delete = function (id) {
        return indexedDB[_instance._slug(className)].where('id_nb').delete();
    };

    this.bulkDelete = function (objects) {
        var id_ar = objects.map(function (object) {
            if (object.hasOwnProperty('id_nb')) {
                return object.id_nb;
            }
        });
        return indexedDB[_instance._slug(className)].filter(function (record) {
            return id_ar.indexOf(record.id_nb) >= 0;
        }).delete();
    };

    /**
     * Efface toute la base
     * @param className
     * @return {Promise<void>|boolean|*}
     */
    this.clearStore = function () {
        return indexedDB[_instance._slug(className)].clear();
    };

    return this;
}

function IndexedDBManagerFactory (indexedDB) {
    return function (className) {
        return new IndexedDBManager(className, indexedDB);
    }
}