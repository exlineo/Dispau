# Connexion avec le serveur

- [Déclaration des services](#déclaration-des-services)
- [Utilisation](#utilisation)
  1. [DBManager.all()](#dbmanagerallnomdeclasse)
  2. [DBManager.get()](#dbmanagergetnomdeclasse-identifiant)
  3. [DBManager.save()](#dbmanagersavenomdeclasse-objet)
  4. [DBManager.delete()](#dbmanagerdeletenomdeclasse-identifiant)
- [Authentification](#authentification)
- [Considérations pour le serveur](#considérations-pour-le-serveur)
  1. [Méthodes](#méthodes)
  2. [Forme des urls](#forme-des-urls)
  3. [Format des données](#format-des-données)
- [Fonctionnement](#fonctionnement)
  1. [Récupération de données](#récupération-de-données)
  2. [Création d'un enregistrement](#création-dun-enregistrement)
  3. [Mise à jour d'un enregistrement](#mise-à-jour-dun-enregistrement)
  4. [Suppression d'un enregistrement](#suppression-dun-enregistrement)
  5. [Retour du réseau](#retour-du-réseau)

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
app.controller('myController', ['DBManager', myController]);
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
### Méthodes
`DBManager.all()` et `DBManger.get()` utilisent la méthode HTTP **`GET`**
`DBManager.all()` et `DBManager.delete()` utilisent la méthode HTTP **`POST`**

### Forme des urls
Les urls sont de la forme suivante :
`http://{servername}/php/{model}.php?action={action}[&id={identifiant}]`  
- **servername**: le nom de domaine du serveur qui héberge l'application
- **model**: le nom du modèle, en minuscule sans préfixe du package.  
Par exemple : `ANNAnnonce` -> `annonce`, `LIELieu` -> `lieu`
- **action**: l'action que l'on souhaite effectuer :
  * `create` : insérer un nouvel enregistrement
  * `read` : lire des données
  * `updtate` : mettre à jour un enregistrement
  * `delete` : supprimer un enregistrement
- **id** *(pour `read`, `update` et `delete`)*: l'identifiant de l'enregistremnt.  
Pour `read`, le paramètre `id` est **optionel**. Il ne sera présent que si l'on souhaite lire qu'un seul enregistrement.

### Format des données
Les données envoyées au serveur sont au format JSON.
À la réception, décoder les données :
```php
$data = json_decode(file_get_contents('php://input');
```

Le serveur doit répondre au format JSON.  
**Ne pas oublier le header:**
```php
header('Content-Type: application/json;charset=utf8;');
echo $réponse_du_serveur
```

## Fonctionnement
### Récupération de données
#### Online
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-read.png)
Quand un contrôleur appelle la méthode DBManager.all() ou DBManager.get(), 
DBManaager utilise AjaxService pour effectuer une requête Ajax (AjaxService.get()).  
Si celle-ci réussi, le résultat est enregistré dans la base de donnée IndexedDB
via le IndexedDBManager.
#### Offline
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-read-no-net.png)
Si le réseau n'est pas disponible, DBManager utilise IndexedDB pour récupérer les 
données locales.
### Création d'un enregistrement
#### Online
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-create.png)
Quand un contrôleur appelle la méthode DBManager.save() et que l'enregistrement
n'existe pas dans la base de données, 
DBManaager utilise AjaxService pour effectuer une requête Ajax (AjaxService.post()).  
Si celle-ci réussi, le résultat est enregistré dans la base de donnée IndexedDB
via le IndexedDBManager.
#### Offline
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-create-no-net.png)
Si le réseau n'est pas disponible, on crée une instance de REQRequest qu'on place
dans la base de données IndexedDB pour plus tard.  
L'enregistrement est ajouté à la base de données locale.
### Mise à jour d'un enregistrement
#### Online
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-update.png)
Quand un contrôleur appelle la méthode DBManager.save() et que l'enregistrement
existe dans la base de données, 
DBManaager utilise AjaxService pour effectuer une requête Ajax (AjaxService.put()).  
Si celle-ci réussi, le résultat est enregistré dans la base de donnée IndexedDB
via le IndexedDBManager.
#### Offline
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-update-no-net.png)
Si le réseau n'est pas disponible, on crée une instance de REQRequest qu'on place
dans la base de données IndexedDB pour plus tard.  
L'enregistrement est mis à jour dans la base de données locale.
### Suppression d'un enregistrement
#### Online
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-delete.png)
Quand un contrôleur appelle la méthode DBManager.delete(),
DBManaager utilise AjaxService pour effectuer une requête Ajax (AjaxService.delete()).  
Si celle-ci réussi, l'enregistrement est supprimé de la base de donnée IndexedDB
via le IndexedDBManager.
#### Offline
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-delete-no-net.png)
Si le réseau n'est pas disponible, on crée une instance de REQRequest qu'on place
dans la base de données IndexedDB pour plus tard.  
L'enregistrement est supprimé de la base de données locale.

### Retour du réseau
![Merge Read](http://gael-philippe.fr/img/dispau/doc/merge-net-back.png)
Quand la connectivité au net revient, le service RequestQueue lis toutes les 
REQRequest stockées dans l'IndexDB et les envoie au serveur.
S'il s'agit d'un update, AjaxService utilise sa méthode merge() pour fusionner
le modifications qu'on souhaite faire et celle effectuées sur le serveur pendant
qu'on était hors ligne.
Un champ `modifications` présent sur tous les enregistrements est utilisé pour
déterminer quel champs mettre à jour.