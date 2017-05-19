function AnnonceListeElement() {

    AnnonceListe.call(this);

    this.afficherAnnonces = function () {
        this.annonces_ar.forEach(function (el) {
            console.log(el.dateFinInscription_dat);

            var annonceID = document.getElementById('annonceTest');

            var divItem = document.createElement('div');
            //Ajout d'un attribut data-id pour mieux identifier l'annonce
            divItem.setAttribute('data-id', el.id_nb);
            divItem.className = 'item';
            divItem.style.background = 'url(' + el.image_Img + ')';
            divItem.style.backgroundSize = 'cover';
            divItem.style.backgroundPosition = 'center top';


            var divCarousel = document.createElement('div');
            divCarousel.className = 'carousel-caption';

            var titreAnnonce = document.createElement('h2');
            titreAnnonce.innerHTML = el.nom_str;

            divCarousel.appendChild(titreAnnonce);
            divItem.appendChild(divCarousel);
            annonceID.appendChild(divItem);
        });
    };

    /**
     * Permet de supprimer une annonce du DOM grâce à son ID
     * @param _id ID de l'annonce
     */
    this.supprimerAnnonce = function( _id){
        //Permet de récupérer toutes les annonces du DOM
        var divElement = document.getElementsByClassName('item');

        //Permet de récupérer le parent Annonce
        var divAnnonce = document.getElementById('annonceTest');

        //Parcours les différentes éléments du DOM et test les ID afin de pouvoir les supprimer dans le DOM et tableau d'annonce
        for( var i =0; i < divElement.length; i++){
            var dataId = divElement[i].getAttribute('data-id');
            if(dataId == _id){
                console.log(divElement[i]);
                divAnnonce.removeChild(divElement[i])
                delete this.annonces_ar[_id]
            }
            else{
                console.log('L\'annonce n\'existe pas')
            }
        }

    }
}

/** HYDRATE

 var tmp = 'madeuxiemebalise';

 var monObjet = {'tahar':'#nomdemabalise', 'fabien':'#nomdemabalise2', 'alexandre':'Pose des questions', 'francis':'pose des interrogations'};
 var monObjet2 = {'tahar':'#nomdemabalise'};

 // console.log(monObjet.mabalise);
 // console.log(monObjet[tmp]);



 function MaClasse(){
    this.tahar = 'ta mère';
    this.fabien = '';
    var ici = this;

    this.hydrate = function(obj){
        for(var i in obj){
            console.log("i > "+i);
            // console.log("Valeur de i : "+obj[i]);
            ici[i] = obj[i];
        }
    }
}

 var maclasse = new MaClasse();
 console.log(maclasse.tahar);
 maclasse.hydrate(monObjet);
 console.log("Alexandre = "+maclasse.alexandre);

**/