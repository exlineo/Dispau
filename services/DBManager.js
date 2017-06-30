/**
 * RIEN A CHANGER SAUF ADPATER NOM DEXIE
 */

/**
 * Manager pour la base de données distant (REST)
 * @param {string} className            Le nom de la classe du manager
 * @param {IndexedDB} IndexedDB         Le service d'accès à la base de données
 * @param {AjaxService} restService     Le service d'accès à l'API REST
 * @param {RequestQueue} requestQueue   Le service de mise en attente des requêtes
 * @param {IndexedDBManager} localManager   Service Manager pour la base de données locale utilisé en fallback
 * @param {$q} $q                       Le service de Promise Angular
 * @constructor
 */
function DBManager (className, IndexedDB, restService, requestQueue, localManager, $q) {
    var _instance = this;
    this._localManager = localManager(className);

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

    this.limit = function (limit) {
        this._limit = limit;
        return this;
    };

    /**
     * Méthode pour ajouter les fonctions de filtrage à la promise
     * @param {$q} promise
     * @returns {$q}
     * @private
     */
    this._decoratePromise = function (promise) {
        /**
         * Ajoute une clause 'where'
         * @param {string} champ
         * @returns {$q}
         */
        promise.where = function (champ) {
            if (_instance._whereClause.length === 0) {
                _instance._whereClause.push({
                    clause: 'where',
                    champ:  champ
                });
            } else {
                throw 'On ne peut where() qu\'en premier';
            }

            return promise;
        };

        /**
         * Ajoute une clause 'and'
         * @param {string} champ
         * @returns {$q}
         */
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

        /**
         * Ajoute une clause 'or'
         * @param {string} champ
         * @returns {$q}
         */
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

        /**
         * Ajoute la partie comparaison de la clause
         * @param {{clause: string, champ: string}} clause  La clause where, ou and, ou or
         * @param {string} comparaison  La comparaion (equals, above, below, not)
         * @param {*} valeur    La valeur à comparer
         * @returns {{clause: string, champ: string, comparaison: string, valeur: *}}
         */
        function comparaison (clause, comparaison, valeur) {
            clause.comparaison = comparaison;
            clause.valeur = valeur;
            return clause;
        }

        /**
         * Signifie qu'on attend l'égalité
         * @param {*} value
         * @returns {$q}
         */
        promise.equals = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'equals', value);
            } else {
                throw "On ne peut pas utiliser equals() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        /**
         * Signifie qu'on attend la supériorité stricte
         * @param {*} value
         * @returns {$q}
         */
        promise.above = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'above', value);
            } else {
                throw "On ne peut pas utiliser above() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        /**
         * Signifie qu'on attend l'ifériorité stricte
         * @param {*} value
         * @returns {$q}
         */
        promise.below = function (value) {
            if (_instance._whereClause.length > 0) {
                var dernierIndex = _instance._whereClause.length - 1;
                _instance._whereClause[dernierIndex] = comparaison(_instance._whereClause[dernierIndex], 'below', value);
            } else {
                throw "On ne peut pas utiliser below() sans avoir utilisé where() d'abord";
            }

            return promise;
        };

        /**
         * Signifie qu'on attend la différence
         * @param {*} value
         * @returns {$q}
         */
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

            return promise;
        };

        /**
         * Limite le nombre de résultats
         * @param {number} value    Le nombre de résultats attendus
         * @returns {$q}
         */
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
     * Transforme l'attribut comparaison d'une clause en verbe SQL
     * @param {string} [comparaison=equals|above|below|not]
     * @returns {string} =|>|<|<>
     */
    function comparaisonToSQL (comparaison) {
        var ret = '';

        switch (comparaison) {
            default:
            case 'equals':
                ret = '=';
                break;
            case 'above':
                ret = '>';
                break;
            case 'below':
                ret = '<';
                break;
            case 'not':
                ret = '<>';
                break;
        }

        return ret;
    }

    /**
     * Encadre les chaînes de double quotes, transforme les Date en timestamp
     * Transforme les instances de classes en id
     * @param {*} value
     * @returns {*}
     * @private
     */
    function escapeValueForSQL (value) {
        var ret;
        switch (typeof value) {
            default:
            case 'string':
                ret = '"' + value + '"';
                break;
            case 'number':
                ret = value;
                break;
            case 'object':
                if (value instanceof Date) {
                    ret = value.getTime();
                } else if (value.hasOwnProperty('id_nb')) {
                    ret = value.id_nb;
                }
                break;
        }

        return ret;
    }

    /**
     * Transforme le tableau de clause en chaîne SQL WHERE ...
     * @returns {string}
     * @private
     */
    this._serializedWhereClause = function () {
        var swc = '';

        _instance._whereClause.map(function (item) {
            swc += item.clause;
            if (item.clause !== 'order by') {
                if (item.hasOwnProperty('champ')) {
                    swc += ' `' + item.champ + '`';

                    if (item.hasOwnProperty('comparaison')) {
                        swc += ' ' + comparaisonToSQL(item.comparaison);
                    }
                }
                swc += ' ' + escapeValueForSQL(item.valeur) + ' ';
            } else {
                swc += ' `' + item.valeur + '`' + item.order + ' ';
            }
        });

        return encodeURI(swc);
    };

    /**
     * Récupère tous les éléments de la table
     * @return {$q}            Une promise qui résout à une collection d'objets
     */
    this.all = function () {
        var url = _instance._slug(className) + '.php?action=get';

        return _instance._decoratePromise($q(function (resolve, reject) {
            setTimeout(function () {
                if (_instance._whereClause.length !== 0) {
                    url += '&where=' + _instance._serializedWhereClause();
                }
                // Si on une connection réseau
                if (window.navigator.onLine) {
                    // Envoie d'une requête GET : http://api-url.api/slug/
                    restService.get(url)
                        .then(function (objects) {
                            var modelArray = [];
                            // hydratation du résultat
                            objects.forEach(function (object) {
                                var instance = new window[className];
                                instance.hydrater(object);
                                modelArray.push(instance);
                            });

                            // On efface les objets récupéré de la base locale
                            // et on insère les donénes fraîches
                            _instance._localManager.bulkDelete(objects)
                                .then(function () {
                                    // Insertion
                                    _instance._localManager.bulkSave(objects)
                                        .then(function () {
                                            resolve(modelArray); // Résolution
                                        })
                                        .catch(reject);
                                })
                                .catch(reject);
                        });
                    _instance._whereClause = [];
                }
                else {
                    // Si on n'a pas de réseau,
                    // On lit les données dans la base locale
                    console.log("No network reading locally");

                    var localPromise = _instance._localManager
                        .all();

                    _instance._whereClause.map(function (item) {
                        if (item.hasOwnProperty('comparison')) {
                            localPromise[item.clause](item.champ);
                            localPromise[item.comparaison](item.value);
                        }
                    });

                    localPromise.then(resolve);

                    _instance._whereClause = [];
                }
            }, 10);

        }));
    };

    /**
     * Récupère un élément
     * @param {number} id           L'identifiant de l'élément à récupérer
     * @returns {$q}           Une promise qui résout à l'instance de l'objet récupéré
     */
    this.get = function (id) {
        var url = _instance._slug(className) + '.php?action=get&id=' + encodeURI(id);

        return _instance._decoratePromise($q(function (resolve, reject) {
            setTimeout(function () {
                if (window.navigator.onLine) {
                    // Envoie d'une requète GET : http://api-url.api/slugs/id
                    restService.get(url)
                        .then(function (response) { // Cas de succès de la requête REST
                            var model = new window[className](response); // On instancie le model
                            model.hydrater(response);

                            // On enregistre dans la base
                            _instance._localManager.save(response)
                                .then(function () {
                                    resolve(model);
                                }) // Sucès
                                .catch(reject); // Échec
                        })
                        .catch(reject); // Échec de la requète REST
                }
                else {
                    // Si on n'a pas de réseau,
                    // On lit les données dans la base locale
                    console.log("No network reading locally");
                    _instance._localManager.get(id)
                        .then(resolve)
                        .catch(reject);
                }
            }, 10);

        }));
    };

    /**
     * Mets à jour un élément
     * @param {object} object       L'objet à mettre à jour
     * @return {$q}            Une promise qui résout à l'objet mis à jour
     */
    this.update = function (object) {
        // On récupère la clé primaire
        var pK = object.id_nb;
        var url = _instance._slug(className) + '.php?action=get&id=' + pK;

        return $q(function (resolve, reject) {
            // Si on a une connection réseau
            if (window.navigator.onLine) {
                // MERGE:  On fusionne notre version à celle du serveur
                restService.merge(url, object)
                    .then(function (mergedObject) {
                        // mergedObject est un objet valide à mettre à jour, timestamps mis à jour
                        // Envoi d'une requête PUT : http://api-url.api/slugs/pK
                        restService.put(url, mergedObject)
                            .then(function (updatedObject) {
                                // On enregistre la nouvelle version dans la base
                                _instance._localManager.save(updatedObject)
                                    .then(function (result) {
                                        // Hydratation de la classe
                                        var resultInstance = new window[className]();
                                        resultInstance.hydrater(updatedObject);
                                        resolve(resultInstance);
                                    }) // Succès
                                    .catch(reject); // Échec
                            })
                            .catch(reject);
                    });
            } else {
                // Pas de réseau
                // On stocke la requète dans la base de données locale
                console.log('No network queuing PUT REQUEST');
                // Instanciation
                var request = new REQRequest(null, 'put', _instance._slug(className) + '.php?action=update&id=' + pK, object);
                // Mise en attente
                requestQueue.put(request);
                // enregistrement dans la base locale
                _instance._localManager.save(object)
                    .then(function (result) {
                        resolve(object);
                    }) // Succès
                    .catch(reject); // Échec
            }
        });
    };

    /**
     * Enregistre un nouvel enregistrement
     * @param {object} object       L'objet à insérer dans la base
     * @return {$q}            Une Promise qui résout à l'objet inséré
     */
    this.persist = function (object) {
        return $q(function (resolve, reject) {
            // Si on est en ligne, on envoie la requète sur le serveur
            // Si tout va bien, on enregistre dans la DB
            if (window.navigator.onLine) {
                // On supprime les caractères spéciaux pour la rétro compatibilité IE
                //object.value = object.value.replace(/\s/g, '');
                // Envoie d'une requète POST
                restService.post(_instance._slug(className) + '.php?action=create', object)
                    .then(function (object) { // Cas de succès de la requète REST
                        // On stocke dans la base locale
                        _instance._localManager.save(object)
                            .then(function (result) {
                                var resultInstance = new window[className]();
                                resultInstance.hydrater(object);
                                resolve(resultInstance);
                            }) // Succès
                            .catch(reject); // Échec
                    })
                    .catch(reject); // Cas d'échec de la requète REST
            } else {
                // Pas de réseau
                // On stocke la requète dans la base de données locale
                console.log('No network queuing POST REQUEST');
                var request = new REQRequest(null, 'post', _instance._slug(className) + '.php?action=create', object);
                requestQueue.put(request);
                _instance._localManager.save(object)
                    .then(function (result) {
                        resolve(object);
                    }) // Succès
                    .catch(reject); // Échec
            }
        });
    };

    /**
     * Insère un nouvel enregistrement ou met un enregistrement à jour
     * @param {object} object       L'objet à persister
     * @return {$q}            Une Promise qui résout à l'objet inséré ou mis à jour
     */
    this.save = function (object) {
        var modifications = {}; // Initialisation des modifications
        var now = +new Date(); // Timestamp de maintenant
        var plainObject = {};

        // Initialisation de l'objet modifications
        for (var prop in object) {
            if (object.hasOwnProperty(prop)
                && prop !== 'modifications'
                && typeof object[prop] !== 'function') {
                plainObject[prop] = object[prop];
                modifications[prop] = now;
            }
        }

        plainObject.modifications = JSON.stringify(modifications);

        return $q(function (resolve, reject) {
            // On récupère l'identifiant de l'objet
            var pK = object.id_nb;

            if(typeof pK === 'undefined') {
                _instance.persist(plainObject)
                    .then(resolve)
                    .catch(reject);
            } else {
                // On regarde s'il exite une enregistrement local avec cet id
                _instance._localManager.get(pK)
                    .then(function (existingObject) {
                        // Si un objet existe, on fait un update
                        if (typeof existingObject !== 'undefined') {
                            _instance.update(plainObject)
                                .then(resolve)
                                .catch(reject);
                        } else {
                            // Sinon on fait un nouvel enregistrement
                            _instance.persist(plainObject)
                                .then(resolve)
                                .catch(reject);
                        }
                    })
                    .catch(reject);
            }
        });
    };

    /**
     * Insère ou mets à jour une collection (tableau) d'éléments
     * @param {[]} objects           Un tableau d'instances à insérer ou mettre à jour
     * @returns {$q}
     */
    this.bulkSave = function (objects) {
        var plainObjects = [];
        objects.map(function (object) {
            var plainObject = {};
            var modifications = {};

            for (var prop in object) {
                if (object.hasOwnProperty(prop)
                    && prop !== 'modifications'
                    && typeof object[prop] !== 'function') {
                    plainObject[prop] = object[prop];
                    modifications[prop] = now;
                }
            }

            plainObject.modifications = JSON.stringify(modifications);
        });

        if (window.network.onLine) {
            return $q(function (resolve, reject) {
                restService.put(_instance._slug(className) + '.php?action=update', plainObjects)
                    .then(function (objects) {
                        objects.map(function (object) {
                            var instance = new window[className]();
                            instance.hydrater(object);
                            return instance;
                        });
                        _instance._localManager.bulkSave(className, objects);
                        resolve(objects);

                    })
                    .catch(reject);
            });
        } else {
            return $q(function (resolve, reject) {
                var request = new REQRequest(null, 'put', _instance._slug(className) + '.php?action=update', plainObjects);
                requestQueue.put(request);
                _instance._localManager.bulkSave(plainObjects)
                    .then(function () {
                        resolve(objects);
                    })
                    .catch(reject);
            });

        }

    };

    /**
     * Supprime un enregistrement de la base de données
     * @param id
     * @return {$q}
     */
    this.delete = function (id) {
        return $q(function (resolve, reject) {
            // Si on est en ligne, on envoie la requète sur le serveur
            // Si tout va bien, on enregistre dans la DB
            if (window.navigator.onLine) {
                // Requête DELETE
                restService.delete(_instance._slug(className) + ".php?action=delete&id=" + id)
                    .then(function (responseKey) { // Cas de succès de la requête AJAX
                        // Enregistrement dans la DB
                        _instance._localManager.delete(className, id)
                            .then(resolve) // Succès
                            .catch(reject); // Échec
                    })
                    .catch(reject); // Cas d'échec de la requête Ajax
            } else {
                // Pas de réseau
                // On stocke la requète dans la base de données locale
                console.log('No network queuing DELETE REQUEST');
                var request = new REQRequest(null, 'post', _instance._slug(className) + ".php?action=delete&id=" + id);
                requestQueue.put(request);
                _instance._localManager.delete(className, id)
                    .then(resolve) // Succès
                    .catch(reject); // Échec
            }
        });
    };

    /**
     * Supprime une collection d'objets d'une même classe
     * @param {string} className    Le nom de la classe des objets à supprimer
     * @param {[]} objects          Un tableau contenant les instances des objets à supprimer
     * @returns {$q}                Un promesse qui résout aux ids supprimées
     */
    this.bulkDelete = function (className, objects) {
        var ids = objects.map(function (obj) {
            return obj.id_nb;
        });
        return $q(function (resolve, reject) {
            if (window.navigator.onLine) {
                restService.post(_instance._slug(className) + '.php?action=delete', ids)
                    .then(function (ids) {
                        _instance._localManager.bulkDelete(className, ids)
                            .then(function () {
                                resolve(ids);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            } else {
                var request = new REQRequest(null, 'post', _instance._slug(className) + '.php?action=delete', ids);
                requestQueue.put(request);
                _instance._localManager.bulkDelete(className, ids)
                    .then(function () {
                        resolve(ids);
                    })
                    .catch(reject);
            }
        });
    };

    return this;
}

function dbManagerFactory (IndexedDB, restService, requestQueue, localManager, $q) {
    return function (className) {
        return new DBManager(className, IndexedDB, restService, requestQueue, localManager, $q);
    }
}