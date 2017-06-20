# Connexion avec le serveur

- [Déclaration des services](#declaration-des-services)
- [Utilisation](#utilisation)
  1. [DBManager.all()](#dbmanagerallnomdeclasse)
  2. [DBManager.get()](#dbmanagergetnomdeclasse-identifiant)
  3. [DBManager.save()](#dbmanagersavenomdeclasse-objet)
  4. [DBManager.delete()](#dbmanagerdeletenomdeclasse-identifiant)
- [Authentification](#authentification)
- [Considérations pour le serveur](#considerations-pour-le-serveur)

## Déclaration des services
```javascript
// Déclaration du module
var app = angular.module('myApp', []);

// Déclaration des services
app.factory('IndexedDB', [IndexedDB]);
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManager]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'IndexedDBManager', 'AjaxService', 'RequestQueue', DBManager]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);

// Déclaration d'un contrôleur
app.controller('myController', ['DBManager', function (dbManager) {
    // Le code du contrôleur
}]);
```

## Utilisation
### Récupération des données
#### DBManager.all(*nomDeClasse*)
Permet de récupérer touts les enregistrements d'une table. 
Renvoie un tableau "hydraté".  
Le premier paramètre permet :
- de construire la requête Ajax
- de indiquer la table de la base de données du navigateur
- l'hydratation avec les données reçues du serveur

**Exemple**
```javascript
/**
* @param {DBManager} dbManager  Le service d'accès au serveur
* @constructor
*/
function myController (dbManagaer) {
    var ici = this;
    /**
     * Notre modèle de données des instances de ANNAnnonce
     * @type {ANNAnonnce[]}
     * @default []
     */
    this.model = [];
    
    // Récupération de TOUTES les annonces
    dbManagaer.all('ANNAnnonce')
        .then(function (annonces) {
            // annonces est un tableau contenant
            // des instances de ANNAnnonce
            ici.model = annonces;
        })
        .catch(function (error) {
            // TODO: Gére l''erreur
        })
}
```


#### DBManager.get(*nomDeClasse*, *identifiant*)
Permet de récupérer un enregistrement unique. Renvoie une instance "hydraté".
Le premier paramètre permet :
- de construire la requête Ajax
- de indiquer la table de la base de données du navigateur
- l'hydratation avec les données reçues du serveur  

Le second paramètre est l'identifiant de l'enregistrement  

**Exemple**
```javascript
/**
 * @param {DBManager} dbManager    Le service d'accès au serveur
 * @constructor
 */
function myController(dbManager) {
    var ici = this;
    /** 
     * Notre modèle de données, un instance de Annonce
     * @type {ANNAnnonce}
     * @default null
     */
    this.model = null;
    
    // Récupération de l'annonce avec l'identifiant 23
    dbManager.get('ANNAnnonce', 23)
        .then(function (annonce) {
            // annonce est une instance d'ANNAnnonce
            ici.model = annonce;
        })
        .catch(function (error) {
            // TODO: Gérer l'erreur
        })
}
```


#### DBManager.save(*nomDeClasse*, *objet*)
Permet de sauvegarder ou de mettre à jour un enregistrement dans la base
de données.  
Le premier paramètre permet :
- de construire la requête Ajax
- de indiquer la table de la base de données du navigateur
- l'hydratation avec les données reçues du serveur

Le second paramètre est l'instance de l'objet à enregistrer ou à mettre à jour.  

**Exemple**
```javascript
/**
 * @param {DBManager} dbManager    Le service d'accès au serveur
 * @constructor
 */
function myController(dbManager) {
    var ici = this;
    /** 
     * Notre modèle de données, un instance de Annonce
     * @type {ANNAnnonce}
     * @default null
     */
    this.model;
    
    // Enregistrement de l'annonce contenue dans ici.model
    this.enregistrerAnnonce = function () {
        dbManager.save('ANNAnnonce', ici.model)
            .then(function (annonce) {
                // annonce est l'annonce mise à jour
                // ou enregistrée
                ici.model = annonce;
            })
            .catch(function (error) {
                // TODO: Gérer l'erreur
            });
    }
}
```
  
  
#### DBManager.delete(*nomDeClasse*, *identifiant*)
Permet de supprimer un enregistrement unique. Renvoie une instance "hydraté".
Le premier paramètre permet :
- de construire la requête Ajax
- de indiquer la table de la base de données du navigateur
- l'hydratation avec les données reçues du serveur  

Le second paramètre est l'identifiant de l'enregistrement à supprimer

**Exemple**
```javascript
/**
 * @param {DBManager} dbManager    Le service d'accès au serveur
 * @constructor
 */
function myController(dbManager) {
    var ici = this;
    /** 
     * Notre modèle de données, un instance de Annonce
     * @type {ANNAnnonce}
     * @default null
     */
    this.model;
    
    this.supprimerAnnonce = function () {
        // Récupération de l'annonce avec l'identifiant 23
            dbManager.get('ANNAnnonce', ici.model.id)
                .then(function (annonce) {
                    // annonce est l'instance de l'annonce supprimée
                })
                .catch(function (error) {
                    // TODO: Gérer l'erreur
                });
    }
}
```

## Authentification
Le token d'identification doit se trouver dans un cookie nommé 'api-token'.  
Il sera envoyé dans le header 'X-Access-Token'.  
Le serveur se doit de vérifier la présence de ce header et de le décoder à chaque fois.

**Exemple**
```php
// récupération du token
$token = get_all_headers()['X-Access-Token'];

try {
    // On décode le token
    // $secret est la phrase secrète utilisée pour encoder le token
    $decoded = JWT::decode($token, $secret);
} catch (Exception $e) {
    // Le décodage échoue
    // On revoie un erreur 401 - Unauthorized
    http_response_code(401);
    echo 'Erreur d\'authentification';
    // Fin de l'execution du script
    exit();
}

// Tout s'est bien passé, on poursuit l'exécution
```

## Considérations pour le serveur
