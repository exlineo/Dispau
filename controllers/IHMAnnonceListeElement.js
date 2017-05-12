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

            /*//Permet de créer le DOM d'affichage de l'annonce.
            var annonceID = document.getElementById('annonce');
            var divAnnonce = document.createElement('div');

            var nom, description, dateDebut, dateFin, dateCreation, lieu, centreInteret, placesMin, placesMax, image,
                particpants;



            image = document.createElement('img');
            image.setAttribute('src', el.photo_str);
            image.setAttribute('alt', el.nom_str);

            nom = document.createElement('h1');
            nom.innerHTML = el.nom_str;

            description = document.createElement('p');
            description.innerHTML = el.description_str;

            dateDebut = document.createElement('div');
            dateDebut.innerHTML = el.dateDebut_dat;

            dateFin = document.createElement('div');
            dateFin.innerHTML = el.dateFin_dat;

            dateFinInscription = document.createElement('div');
            dateFinInscription.innerHTML = el.dateFinInscription_dat;

            dateCreation = document.createElement('div');
            dateCreation.innerHTML = el.dateCreation_dat;

            lieu = document.createElement('p');
            lieu.innerHTML = el.lieu_lie;

            var ulCentreInteret;
            ulCentreInteret = document.createElement('ul');

            for (var i = 0; i < el.centresInterets_ar.length; i++) {
                centreInteret = document.createElement('li');
                centreInteret.innerHTML = el.centresInterets_ar[i];
                ulCentreInteret.appendChild(centreInteret);
            }

            placesMin = document.createElement('p');
            placesMin.innerHTML = el.placesMin_nb;

            placesMax = document.createElement('p');
            placesMax.innerHTML = el.placesMax_nb;

            var ulParticipants;
            ulParticipants = document.createElement('ul');

            //Test si les il y a des participants dans le tableau
            if (el.participants_ar.length < 0) {
                for (var i = 0; i < el.centresInterets_ar.length; i++) {
                    particpants = document.createElement('li');
                    particpants.innerHTML = el.participants_ar[i];
                    ulParticipants.appendChild(particpants);
                }
            }

            else {
                particpants = document.createElement('li');
                particpants.innerHTML = "Aucun participant";
                ulParticipants.appendChild(particpants);
            }

            divAnnonce.appendChild(image);
            divAnnonce.appendChild(nom);
            divAnnonce.appendChild(description);
            divAnnonce.appendChild(dateDebut);
            divAnnonce.appendChild(dateFin);
            divAnnonce.appendChild(dateCreation);
            divAnnonce.appendChild(dateFinInscription)
            divAnnonce.appendChild(lieu);
            divAnnonce.appendChild(ulCentreInteret);
            divAnnonce.appendChild(placesMin);
            divAnnonce.appendChild(placesMax);
            divAnnonce.appendChild(ulParticipants);
            annonceID.appendChild(divAnnonce);*/
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
                delete this.annonces_ar[_id]
                divAnnonce.removeChild(divElement[i])
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