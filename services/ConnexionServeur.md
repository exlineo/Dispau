# Connexion avec le serveur

- [Déclaration des services](#déclaration-des-services)
- [Utilisation](#utilisation)
  1. [DBManager.all()](#dbmanagerall)
  2. [DBManager.get()](#dbmanagergetidentifiant)
  3. [Fonctions de filtrage](#fonctions-de-filtrage)
  4. [DBManager.limit()](#dbmanagerlimit)
  5. [DBManager.save()](#dbmanagersaveobjet)
  6. [DBManager.delete()](#dbmanagerdeletenidentifiant)
  7. [DBManager.bulkSave()](#dbmanagerbulksaveobjects)
  8. [DBManager.bulkDelete()](#dbmanagerbulkdeleteobjects)
- [Authentification](#authentification)
- [Considérations pour le serveur](#considérations-pour-le-serveur)
  1. [Méthodes](#méthodes)
  2. [Forme des urls](#forme-des-urls)
  3. [Format des données](#format-des-données)
  4. [Exemples de traîtements côté serveur](#exemples-de-traîtements-côté-serveur)
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
app.factory('IndexedDBManager', ['IndexedDB', IndexedDBManagerFactory]);
app.factory('AjaxService', ['$http','$cookies', AjaxService]);
app.factory('DBManager', ['IndexedDB', 'AjaxService', 'RequestQueue', 'IndexedDBManager', '$q', dbManagerFactory]);
app.factory('RequestQueue', ['$rootScope', 'IndexedDBManager', 'AjaxService', RequestQueue]);

// Déclaration d'un contrôleur
app.controller('myController', ['DBManager', myController]);
```

## Utilisation
### Récupération des données
#### DBManager.all()
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
    var annoncesManager = dbManager('ANNAnnonce');
    annoncesManager.all()
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


#### DBManager.get(*identifiant*)
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
    var annonceManager = dbManager('ANNAnnonce');
    dbManager.get(23)
        .then(function (annonce) {
            // annonce est une instance d'ANNAnnonce
            ici.model = annonce;
        })
        .catch(function (error) {
            // TODO: Gérer l'erreur
        })
}
```

#### Fonctions de filtrage
Les fonctions de filtrage permettent de filtrer les résultats attendus. 

- where(*champ*) : permet de désigner un champ sur lequel appliquer une condition
- and(*champ*) : permet d'appliquer une deuxième condition
- or(*champ*) : permet d'appliquer une condition alternative
- equals(*valeur*) : permet d'indiquer une égalitée
- above(*valeur*) : permet d'indiquer une supériorité exclusive
- below(*valeur*) : permet d'indiguer une infériorité exclusive
- not(*valeur*) : tout sauf ça

**Exemples**
```javascript
// Récupérer toutes les annonces du gestionaire avec l'identifiant 15
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `idGestionnaire_id` = 15
    .all().where('idGestionnaire_id').equals(15)
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces dont la propriété idGestionnaire_nb est égale à 15
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```
```javascript
// Récupérer toutes les annonces des gestionnaire dont l'identifiant n'est pas 15
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `idGestionnaire_id` <> 15
    .all().where('idGestionnaire_id').not(15)
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces dont la propriété idGestionnaire_nb n'est pas 15
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```
```javascript
// Récupérer toutes les annonces après une date
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `date_dat` > 17294302348
    .all().where('date_dat').above(new Date('2017-01-01'))
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces dont la date est postérieur au 1/1/2017
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```
```javascript
// Récupérer toutes les annonces avant une date
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `date_dat` < 17459382383
    .all().where('date_date').below(new Date())
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces dont la date est antérieure à aujourd'hui
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```
```javascript
// Récupérer toutes les annonces entre deux dates
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `date_dat` > 17294302348 and `date_dat` < 17294302348
    .all().where('date_date').below(new Date())
    .and('date_dat').above(new Date('2017-01-01'))
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces dont la date est 
        // entre le 1/1/2017 et aujourd'hui
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```
```javascript
// Récupérer toutes les annonces avec 1 ou 3 participants max
var annonceManager = dbManager('ANNAnnonce');
annonceManager
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : where `personnesMax_nb` = 3 or `personnesMax_nb` = 1
    .all().where('personnesMax_nb').equals(3)
    .or('personnesMax_nb').equals(1)
    .then(function (annonces) {
        // annonces est un tableau d'instances d'annonces 
        // avec soit 3 personnes Max ou 1 personnes max
        ici.model = annonces;
    })
    .catch(function (error) {
        
    });
```

#### DBManager.limit()  
Permet de limiter le nombre de résultats pour *all()* et *get()*.  
**Exemple**  
```javascript
function myController(dbManager) {
    var ici = this;
    this.model = [];
    
    var annoncesManager = dbManager('ANNAnnonce');
    // Envoie une requête HTTP GET avec comme paramètres:
    // - action : get
    // - where : limit 5
    annoncesManager
        .all()
        .limit(5)
        .then(function (annonces) {
            // annonces.length == 5
            ici.model = annonces;
        })
        .catch(function (error) {
            // TODO: Gérer l'erreur
        });
}
```

#### DBManager.save(*objet*)
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
    var annonceManager = dbManager('ANNAnnonce');
    this.enregistrerAnnonce = function () {
        annonceManager.save(ici.model)
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
  
  
#### DBManager.delete(*identifiant*)
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
    
    var annonceManager = dbManager('ANNAnnonce');
    this.supprimerAnnonce = function () {
        // Récupération de l'annonce avec l'identifiant 23
            annonceManager.delete(ici.model.id)
                .then(function (annonce) {
                    // annonce est l'instance de l'annonce supprimée
                })
                .catch(function (error) {
                    // TODO: Gérer l'erreur
                });
    }
}
```

#### DBManager.bulkSave(*objects*)
Permet d'insérer ou de mettre à jour plusieurs objets à la fois.   

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
     * @type {ANNAnnonce[]}
     * @default []
     */
    this.model = [];
    
    // Enregistrement de l'annonce contenue dans ici.model
    var annonceManager = dbManager('ANNAnnonce');
    this.enregistrerAnnonce = function () {
        annonceManager.bulkSave(ici.model)
            .then(function (annonces) {
                // annonce est l'annonce mise à jour
                // ou enregistrée
                ici.model = annonces;
            })
            .catch(function (error) {
                // TODO: Gérer l'erreur
            });
    }
}
```

#### DBManager.bulkDelete(*objects*)
Permet de supprimer plusieurs objets à la fois.   

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
     * @type {ANNAnnonce[]}
     * @default []
     */
    this.model = [];
    
    // Suppression toutes les annocnes d'un gestionnnaire
    var annonceManager = dbManager('ANNAnnonce');
    this.supprimerAnnoncesDeUtilisateur = function (gestionnaire_id_nb) {
        var annoncesASupprimer = this.model.filter(function (annonces) {
            return annonces.idGestionnaire_nb === utilisateur_id_nb;
        });
        
        annonceManager.bulkDelete(annoncesASupprimer)
            .then(function (annonces) {
                // annonce est l'annonce mise à jour
                // ou enregistrée
                ici.model = annonces;
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
`http://{servername}/php/{model}.php?action={action}[&id={identifiant}][&where={where}]`  
- **servername**: le nom de domaine du serveur qui héberge l'application
- **model**: le nom du modèle, en minuscule sans préfixe du package.  
Par exemple : `ANNAnnonce` -> `annonce`, `LIELieu` -> `lieu`
- **action**: l'action que l'on souhaite effectuer :
  * `create` : insérer un nouvel enregistrement
  * `read` : lire des données
  * `update` : mettre à jour un enregistrement
  * `delete` : supprimer un enregistrement
- **id** *(pour `read`, `update` et `delete`)*: l'identifiant de l'enregistremnt.  
Pour `read`, le paramètre `id` est **optionel**. Il ne sera présent que si l'on souhaite lire qu'un seul enregistrement.

- **where**: Une clause where pour filtrer les éléments.  
Il s'agit de d'une chaîne de caractères qui est en fait la partie "WHERE" d'une requête SQL.

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

### Exemples de traîtements côté serveur
#### Cas général
```php
/**
 * Permet de récupérer l'action
 */
$action = $_GET['action'];

// Permet de récupérer l'id de l'annonce
if (isset($_GET['id']))
    $id = $_GET['id'];
else
    $id = null;

// Permet de récupéere la clause where
if (isset($_GET['where']))
    $where = $_GET['where'];
else
    $where = false;

// On choisit la focntion à exécuter en fonction 
// de la variable $action
switch ($action) {
    // Lecture
    case "get" :
        // S'il n'y pas de clause WHERE
        if (!$where)
            echo selectAnnonce($db, $id);
        // S'il y en a une
        else
            echo selectAnnonce($db, $id, $where);

        break;
        
    // Création
    case "create":
        echo createAnnonce($db, $_POST);
        break;
        
    // Mis à jour
    case "update":
        echo updateAnnonce($db, $_POST);
        break;
        
    // Suppression
    case "delete" :
        deleteAnnonce($id);
        break;
}
```
#### Lecture
```php
/**
 * Permet de récupérer les annonces par rapport à l'ID
 * @param PDO $db           L'instance de PDO représentant la connexion à la BDD
 * @param string|int $id    Indentifiant de l'annonce
 * @param string $where     Clause where SQL
 * @return string           Une annonce ou un tableau d'annonces au format JSON
 */
function selectAnnonce($db, $id, $where = '')
{
    // Variable contenant les données reçues de la base de données
    $donnees_ar = [];
    
    try {
        if (!isset($id)) { // Réponse à DBManager.all()
            $req = $db->prepare("SELECT * FROM `annonce` $where");
            $req->execute();
            $donnees_ar = $req->fetchAll(PDO::FETCH_ASSOC);
        } else { // Réponse à DBManager.get(id)
            $req = $db->prepare("SELECT * FROM `annonce` WHERE id_nb = :id_nb");
            $req->execute(array(
                'id_nb' => $id
            ));
            $donnees_ar = $req->fetch(PDO::FETCH_ASSOC);
        }
    } catch (Exception $e) {
        echo 'ERROR: ' . $e->getMessage();
        return json
    }
    
    return json_encode($donnees);
}
```
#### Création
```php
function createAnnonce($db, $data) {
     // Normalement on ne met pas des ... mais vraiment les noms des champs
    $req = $db->prepare("INSERT INTO `annonce` (nom_str ...) VALUES (:nom ...)");
    $result = $req->execute($data);
    
    // C'est très mauvais ça, on ne récupère pas l'identifiant du nouvel enregistrement
    if ($result) {
        return json_encode($data);
    }
}
```

#### Mise à jour
```php
function updateAnnonce($db, $data) {
    if (isset($_GET['id']) { // Mise à jour d'un seul élément
        
        $req = $db->prepare("UPDATE `annonce` SET nom_str=:nom_str, ... WHERE id_nb = :id_nb");
        $result = $req->execute($data);
        
        if ($result) {
            return json_encode($data);
        }
    } else { // Mise à jour ou insertion de plusieurs éléments
    // TODO: Utiliser peut-être ON DUPLICATE KEY UPDATE pour une insertion en masse
    // ou, plus idempotent, un table temporaire et MERGE
    }
}
```
#### Suppression
```php
function deleteAnnonce($db, $id) {
    $req = $db->prepare("DELETE FROM `annonce` WHERE id_nb = :id');
    $result = $req->execute(['id' => $id]);
    
    if ($result) {
        return $id;
    }
}
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