![DISPAU sur iPhone 5](https://github.com/Greta-JS-2017/Dispau/blob/patrick/views/dispau-iphone5.png)

Le projet DISPAU, en raison de la particularité de sa maquette initiale, doit s'afficher dans la limite verticale de la fenêtre des navigateurs sans scroll. La seule méthode pour afficher des éléments dont le contenu ne peut excéder cette limite de hauteur contrainte est de concevoir des "Modal Boxes" (ou fenêtres modales, semblables à ce que peut produire des iframes).

Vous pourrez donc inclure vos divers éléments IHM dans ces Modal Boxes.

# Creation de fenêtres modales et de message box

La conception permet l'usage de "_Modal Boxes_" ou encore de "_Message Boxes_" dont la hauteur est maîtrisée afin de s'insérer dans l'espace disponible du "viewport" (limitée à la ligne de flotaison du site).
Les Message Boxes seront particulièrement utiles pour l'affichage de messages d'erreurs, notamment.

La création de ces éléments doit être contenue entre les balises d'ouvertre et de fermeture `<div class="content"> ... </div>` du document HTML (voir le fichier : [index.html](https://github.com/Greta-JS-2017/Dispau/blob/patrick/views/index.html)).

## Fenêtres modales

Les fenêtres modales comportent un espace central dévolu au contenu ainsi que d'un pied de box destiné à recevoir des boutons (au minimum un seul : celui permettant leur fermeture).
    Ces boîtes sont centrées et s'adaptent automatiquement en hauteur si bien que vous n'avez pas à vous soucier des problèmes de dimensions ni de positionnement.
Masquées par défaut, elles s'ouvrent, tout comme les Message Box, par un lien `<a>` dont le `href` est une ancre constituée de l'ID de la fenêtre modale ou du message box, peu importe l'emplacement de ces liens d'ouverture dans le document.

La structure à adopter est la suivante :

    <!-- CONNEXION -->
    <div aria-hidden="true" role="dialog" class="modal-dialog dialog tiny no-select" id="open-modal-connexion">

			<div>
				<div class="modal">
					<div class="inner-dialog">
						
            ... Votre contenu avec balisage HTML ...
           
					</div> <!-- /inner-dialog -->

				</div> <!-- /modal -->
				<div class="footer-modal">
					<a href="#close" class="help no-select ripple">Fermer</a> 
					<a href="#open-modal-aide" class="link no-select ripple">Aide</a>
				</div> <!-- /footer-modal -->
			</div>
	 </div> <!-- /modal-dialog -->
   <!-- FIN CONNEXION -->


### Classes et ID à utiliser

L'ID de l'élément est l'identifiant unique permettant d'ouvrir les fenêtres modales par un lien avec cet ID en guise d'ancre.

Détail des classes associées à la première balise `<div>`d'une fenêtre modale :

* `modal-dialog` : obligatoire, c'est ce qui définit les fenêtres modales (de même que les message box). Par défaut, la barre de scroll sur le côté droit sera ajoutée si le contenu excède la hauteur maximale autorisée (variable selon la taille des écrans).
* `dialog` : facultatif. Permet de changer la fenêtre en un message box. Les message box ne comportent jamais de barre de scroll sur le côté - sauf mention contraire (cf. Message Box) : ce sont des blocs informatifs.
* `tiny` : facultatif. Permet de créer des blocs de largeur réduite de 450px maximale : par exemple pour créer une boîte de connexion (par défaut, la largeur maximale est de 900px, fluide et Responsive).
* `no-select`: facultatif. Permet d'interdire la sélection du texte à la souris.


## Message Box

La structure est identique aux fenêtres modales, avec toutefois la présence d'un lien de fermeture du message (affiché en haut et à droite) car ils ne peuvent comporter de bouton en pied de box.

    <!-- MESSAGE ERREUR -->
    <div aria-hidden="true" role="dialog" class="modal-dialog dialog no-select" id="open-modal-erreur">
      <a href="#!" title="Fermer" class="close"><i class="fa fa-times" aria-hidden="true"></i><em>×</em></a>

			<div>
				<div class="modal">
					<div class="inner-dialog">
						
            ... Votre contenu avec balisage HTML ...
           
					</div> <!-- /inner-dialog -->

				</div> <!-- /modal -->
 			</div>
	 </div> <!-- /modal-dialog -->
   

### Classes et ID à utiliser

L'ID est l'identifiant unique permettant d'ouvrir les messages par un lien avec cet ID en guise d'ancre.
  
* `modal-dialog dialog` : obligatoires pour créer un message box.
* `overflow` : permet d'afficher une barre de scroll latérale.
 
 
**Notez bien** : s'il y a présence d'un lien de fermeture sur une fenêtre modale, ce dernier ne sera pas affiché (inutile d'en ajouter un, donc). De même, la présence de boutons en pied de box sur des Message Box ne seront jamais affichés (inutile d'en ajouter). La raison est la suivante : respecter une homogénéité en terme d'UX et initier une reconnaissance différencielle au niveau cognitif pour les utilisateurs finaux.

## Système de grilles

Un système très fin de structure en colonnes - conçu spécialement pour ce projet - est introduit tirant parti, pour les navigateurs nodernes la supportant, de la spécification CSS `flexbox` avec une alternative ("fallback" par `float` et largeurs en `%`) pour les anciens navigateurs.

La dénomination des colonnes est des plus simples : l'appel se faisant par des classes préfixées `c-` suivies d'un nombre correspondant à la répartition désirée. Ainsi, `c-2` produira naturellement un colonnage de deux colonnes de largeur identique.

### Mise en œuvre

La structure nécessite l'encapsulation - quoique *falcultative* mais requise pour bénéficier de `flexbox` - dans une `div` parente désignée par une classe `row` :

    <div class="row">
        <div class="c-2">
	   ... contenu ...
	</div>
	<div class="c-2">
	   ... contenu ...
	</div>
    </div> <!-- /row -->


### Colonnes disponibles par classes
 
* `c-1` : une seule colonne ;
* `c-2` : deux colonnes identiques ;
* `c-3` : trois colonnes identiques ;
* `c-4` : quatre colonnes identiques ;
* `c-5` : cinq colonnes identiques.

**Notez bien** : les colonnes sont affectées d'une pleine largeur (semblable à `c-1`) sur petits écrans.

## Boutons, liens et animations

La conception de boutons se réalise de cette manière :

    <button class="button btn-flat button-green ripple-in"><span>Trouver</span></button>

### Détail des classes utilisées

* `button`: obligatoire avec la suivante :
* `btn-flat` : créé un bouton de visuel "Flat" avec un fond gris et lettres blanches ;
* `button-green` _ou_ `button-orange` : créé des boutons respectivement verts ou oranges ;
* `ripple-in` : (facultative) effet d'une bande, identique à la couleur du bouton, avec mouvement de dispersion (sans effet avec `btn-flat`) ;
* `inactive` : (facultative) change le visuel du bouton en inactif (fond gris avec pointeur de la souris figurant une interdiction).

## Boutons avec liste non-ordonnée déroulante ("Dropdown style")

Pour réaliser de tels boutons, adoptez cette structure :

    <div class="btn-group">
	<button class="button btn-flat">Avec liste <span class="caret"></span></button>
		<ul class="dropdown-btn">
		<li>Item 1</li>
		<li><a href="#!" title="">Item 2</a></li>
		<li>Item 3</li>
		</ul>
	</div>

Avec ces classes obligatoires.

N.B. Les boutons sont toujours centrés.

## Animations

Plusieurs animations CSS sont disponibles pour les boutons et liens. Elles sont invoquées par l'usage de classes :

* `squizz` : effet de dilatation progressive avec coloration "rouge DISPAU" (pour les liens de fermeture) ;
* `ripple` : effet de halo en cercle se diffusant depuis le centre, semblable à ce qu'utilise Google ;
* `ripple-in` : effet d'une barre s'échappant des bords (pour les boutons verts et oranges).

## Fichier de développement et de production

Le fichier de CSS nommé `global.css` a été soigneusement organisé et comporte de nombreux commentaires explicatifs afin d'autoriser les modifications/personnalisations nécessaires au projet. Ce fichier comporte, en outre, un sommaire général présentant les diverses sections internes. Les modifications autorisées (dimensions générales, choix des polices de caractères, couleurs du sites et de ses éléments) sont permises (sans risque de malfonctionnements induits) depuis le haut jusque la section titrée `5°) Layout` (non incluse, les sections suivantes nécessitent une connaissance soutenue des comportements structuraux invoqués).

**Toutes modifications effectuées sur ce fichier de développement, doivent induire sa compression (minification) sur le site [http://minifier.org](http://minifier.org/) (le meilleur outil en ligne actuel, selon nos tests) en remplacement du fichier `global.min.css` : une contrainte permettant d'accroître la rapidité d'affichage du site final, jusque 10%.**
Veillez à maintenir conjointement ces deux fichiers à jour.
