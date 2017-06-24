/**
 * RIEN A CHANGER SAUF ADPATER NOM DEXIE
 */

/**
 * Manager pour la base de données distant (REST)
 * @param {IndexedDB} IndexedDB               Le service d'accès à la base de données
 * @param {AjaxService} restService     Le service d'accès à l'API REST
 * @param {RequestQueue} requestQueue   Le service de mise en attente des requêtes
 * @param {IndexedDBManager} localManager   Service Manager pour la base de données locale utilisé en fallback
 * @constructor
 */
function DBManager (IndexedDB, restService, requestQueue, localManager, $q) {
    var _instance = this;

    this._limit = -1;


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
     * Récupère tous les éléments de la table
     * @param {string} className    Le nom de la classe des objets à récupérer
     * @return {Promise}            Une promise qui résout à une collection d'objets
     */
    this.all = function (className) {
        var url = _instance._slug(className) + '.php?action=get';
        if (this._limit >= 0) {
            url += '&limit=' + this._limit;
        }

        return $q(function (resolve, reject) {
            // Si on une connection réseau
            if (window.navigator.onLine) {
                // Envoie d'une requête GET : http://api-url.api/slug/
                restService.get(url)
                    .then(function (objects) {
                        var modelArray = [];
                        // hydratation du résultat
                        objects.forEach(function (object) {
                            var instance = new window[className];
                            instance.hydrater(object)
                            modelArray.push(instance);
                        });

                        // On efface la table locale et on insère tout
                        localManager.clearStore(className);
                        localManager.bulkSave(className, objects)
                            .then(function () {
                                resolve(modelArray); // Résolution
                                _instance._limit = -1;
                            })
                            .catch(reject);
                    });
            }
            else {
                // Si on n'a pas de réseau,
                // On lit les données dans la base locale
                console.log("No network reading locally");
                localManager
                    .limit(_instance._limit)
                    .all(className)
                    .then(resolve);
                _instance._limit = -1;
            }
        });
    };

    /**
     * Récupère un élément
     * @param {string} className    Le nom de la classe
     * @param {number} id           L'identifiant de l'élément à récupérer
     * @returns {Promise}           Une promise qui résout à l'instance de l'objet récupéré
     */
    this.get = function (className, id) {
        return $q(function (resolve, reject) {
            if (window.navigator.onLine) {
                // Envoie d'une requète GET : http://api-url.api/slugs/id
                restService.get(_instance._slug(className) + ".php?action=get&id=" + encodeURI(id))
                    .then(function (response) { // Cas de succès de la requête REST
                        var model = new window[className](response); // On instancie le model
                        model.hydrater(response);

                        // On enregistre dans la base
                        localManager.save(className, response)
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
                localManager.get(className, id)
                    .then(resolve)
                    .catch(reject);
            }
        });
    };

    /**
     * Mets à jour un élément
     * @param {string} className    Le nom de la classe de l'objet
     * @param {object} object       L'objet à mettre à jour
     * @return {Promise}            Une promise qui résout à l'objet mis à jour
     */
    this.update = function (className, object) {
        // On récupère la clé primaire
        var pK = object.id_nb;

        return $q(function (resolve, reject) {
            // Si on a une connection réseau
            if (window.navigator.onLine) {
                // MERGE:  On fusionne notre version à celle du serveur
                restService.merge(_instance._slug(className) + '.php?action=get&id=' + pK, object)
                    .then(function (mergedObject) {
                        // mergedObject est un objet valide à mettre à jour, timestamps mis à jour
                        // Envoi d'une requête PUT : http://api-url.api/slugs/pK
                        restService.put(_instance._slug(className) + '.php?action=update&id=' + pK, mergedObject)
                            .then(function (updatedObject) {
                                // On enregistre la nouvelle version dans la base
                                localManager.save(className, updatedObject)
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
                localManager.save(className, object)
                    .then(function (result) {
                        resolve(object);
                    }) // Succès
                    .catch(reject); // Échec
            }
        });
    };

    /**
     * Enregistre un nouvel enregistrement
     * @param {string} className    Le nom de la classe de l'objet
     * @param {object} object       L'objet à insérer dans la base
     * @return {Promise}            Une Promise qui résout à l'objet inséré
     */
    this.persist = function (className, object) {
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
                        localManager.save(className, object)
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
                localManager.save(className, object)
                    .then(function (result) {
                        resolve(object);
                    }) // Succès
                    .catch(reject); // Échec
            }
        });
    };

    /**
     * Insère un nouvel enregistrement ou met un enregistrement à jour
     * @param {string} className    Le nom de la classe de l'objet à insérer ou mettre à jour
     * @param {object} object       L'objet à persister
     * @return {Promise}            Une Promise qui résout à l'objet inséré ou mis à jour
     */
    this.save = function (className, object) {
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

            // On regarde s'il exite une enregistrement local avec cet id
            localManager.get(className, pK)
                .then(function (existingObject) {
                    // Si un objet existe, on fait un update
                    if (typeof existingObject !== 'undefined') {
                        _instance.update(className, plainObject)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        // Sinon on fait un nouvel enregistrement
                        _instance.persist(className, plainObject)
                            .then(resolve)
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    };

    /**
     * Insère ou mets à jour une collection (tableau) d'éléments
     * @param {string} className     Le nom de la classe des objets à insérer ou mettre à jour
     * @param {[]} objects           Un tableau d'instances à insérer ou mettre à jour
     * @returns {$q}
     */
    this.bulkSave = function (className, objects) {
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
                        var instances = objects.map(function (object) {
                            var instance = new window[className]();
                            instance.hydrater(object);
                            return instance;
                        });
                        localManager.bulkSave(className, objects);
                        resolve(objects);

                    })
                    .catch(reject);
            });
        } else {
            return $q(function (resolve, reject) {
                var request = new REQRequest(null, 'put', _instance._slug(className) + '.php?action=update', plainObjects);
                requestQueue.put(request);
                localManager.bulkSave(className, plainObjects)
                    .then(function () {
                        resolve(objects);
                    })
                    .catch(reject);
            });

        }

    };

    /**
     * Supprime un enregistrement de la base de données
     * @param className
     * @param id
     * @return {Promise}
     */
    this.delete = function (className, id) {
        return $q(function (resolve, reject) {
            // Si on est en ligne, on envoie la requète sur le serveur
            // Si tout va bien, on enregistre dans la DB
            if (window.navigator.onLine) {
                // Requête DELETE
                restService.delete(_instance._slug(className) + ".php?action=delete&id=" + id)
                    .then(function (responseKey) { // Cas de succès de la requête AJAX
                        // Enregistrement dans la DB
                        localManager.delete(className, id)
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
                localManager.delete(className, id)
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
                        localManager.bulkDelete(className, ids)
                            .then(function () {
                                resolve(ids);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            } else {
                var request = new REQRequest(null, 'post', _instance._slug(className) + '.php?action=delete', ids);
                requestQueue.put(request);
                localManager.bulkDelete(className, ids)
                    .then(function () {
                        resolve(ids);
                    })
                    .catch(reject);
            }
        });
    };

    return this;
}
