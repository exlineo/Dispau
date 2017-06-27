/**
 * RIEN A CHANGER ICI NORMALLEMENT
 */
/**
 * Created by gaelph on 24/05/2017.
 */

/**
 * Created by gaelph on 05/05/2017.
 */

/**
 * Objet repéresentant une requête en attente
 * @param {('get'|'post'|'put'|'delete'|'GET'|'POST'|'PUT'|'DELETE')} method    Méthode HTTP
 * @param {string} url  URL de la requète
 * @param {object} [body=null]    Corps de la requète (pour PUT et POST)
 * @constructor
 * @implements Model
 * @requires IndexedDBManager
 */
function REQRequest (id, method, url, body) {
    this.id_nb = id;
    this.method = method.toLowerCase(); // On ne garde que le bas de casse pour appeler les fonctions de REST
    this.url = url;
    this.timestamp = Date.now();

    // On affiche un warning dans la console si on crée une requête POST ou PUT sans body
    if ((method === 'post' || method === 'put') && typeof body === 'undefined') {
        console.warn("Declaring a " + method.toUpperCase() + " request without a body");
    }

    this.body = body || null;
}

/**
 * Service de gestion de la file d'attende de requêtes
 * @param {$scope} $rootScope           Le $rootScope qui est utilisé comme bus de communication avec les contrrôleurs
 * @param {IndexedDBManager} localManager   Manager de al base données locale pour persister les requêtes en attente
 * @param {AjaxService} restService     Le service d'accès à l'API REST pour envoyer les requêtes quand on retrouve
 * une connection
 * @constructor
 */
function RequestQueue($rootScope, localManager, restService) {
    if (RequestQueue._instance) {
        return RequestQueue._instance;
    }
    RequestQueue._instance = this;

    this._localManager = localManager('REQRequest');

    /**
     * Un tableau contenante les requêtes en attentes
     * @todo Vérifier la nécessité de garder ça en mémoire
     * @type {Request[]}
     */
    this.queue = [];

    /**
     * Récupère toutes les requêtes en attentes de la base locale
     * @private
     */
    this._getAllRequestsFromDB = function () {
        this._localManager.all()
            .then(function (result) {
                RequestQueue._instance.queue = result;
            });
    };
    this._getAllRequestsFromDB();

    /**
     * Ajoute une requête à la file d'attente
     * La requête est stockée dans la base, la liste est rechagée
     * @param {Request} request
     * @todo déterminer si maintenir un copie de la collection en permanance en mémoire est pertinent
     */
    this.put = function (request) {
        console.log('Queued request : ' + request.method + ' ' + request.url);
        this._localManager.save(request);
        this._getAllRequestsFromDB();
    };

    /**
     * Envoie toutes les requêtes en attente
     */
    this.sendAllPending = function () {
        // 2numération de la collection
        this.queue.each(function (request) {
            request = new Request(request.id, request.method, request.url, request.body);
            // Lancement de la requête
            console.log("Sending pending : " + request.method + ' ' + request.url);
            if (request.method !== 'put' ) {
                restService[request.method](request)
                    .catch(function (xhr) { // Échec de la requête
                        // Affichage d'une erreur
                        // TODO: Gérer l'erreur
                    });
            } else {
                restService.merge(request, request.body)
                    .then(function (mergedObject) {
                        restService.put(request)
                            .then(function () {
                                // On signale la mise de données
                                // Pour mettre l'affichage à jour
                                $rootScope.$emit('data-changed');
                            })
                            .catch(function (xhr) {
                                // TODO: Gérer l'erreur
                            });
                    })
                    .catch(function (response) {
                        console.warn('Error: Postponed PUT request');
                        console.error(response);
                    });
            }
        }).then(function () { // À la fin de l'énumération
            RequestQueue._instance.queue.delete() // On supprime toutes les requêtes, echec ou non
                .then(function () {
                    // On recharge la page pour refléter les cas de succès et d'échec
                    //window.location.reload();
                })
                .catch(function (error) {
                    // Erreur à la suppression
                    console.error(error.failures);
                    //window.location.reload();
                });
        })
    };

    // Quand on retrouve une connection, on envoie toutes les requêtes en attente
    document.addEventListener('online', function () {
        RequestQueue._instance.sendAllPending();
    });

    return this;
}