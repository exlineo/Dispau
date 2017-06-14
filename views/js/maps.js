/**
 * Created by alexa on 14/06/2017.
 */

// position par défaut de la carte sur pau
var pau = {lat : 43.296371, lng : -0.370091};

//styliser la map
function getMapStyle() {
    var style = [{
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{"saturation": "-100"}]
    },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"saturation": -100},
                {"lightness": 65},
                {"visibility": "on"}]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"saturation": -100},
                {"lightness": "50"},
                {"visibility": "simplified"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": "-100"}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"lightness": "30"}]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"lightness": "40"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{"lightness": -25}, {"saturation": -100}]
        }];

    return style;
}


//ajouter un marqueur
function addMarker(lieu) {
    //instanciation du marqueur
    var marker = new google.maps.Marker({
        position 	: {
            lat : lieu.latitude_nb, lng : lieu.longitude_nb
        },
        map			: gmap,
        icon		: {
            path: 'M19-5C6.866-5-3,4.966-3,17.214c0,2.233,0.332,4.388,0.941,6.419 c2.523,12.103,17.896,30.404,20.013,32.887C18.217,56.827,18.602,57,19,57c0.049,0,0.096,0,0.145-0.007 c0.372-0.04,0.708-0.227,0.935-0.517l0.083-0.104c4.704-5.628,17.608-21.826,19.901-32.761C40.677,21.588,41,19.439,41,17.214 C41,4.966,31.126-5,19-5 M19,26.169c-4.928,0-8.938-4.016-8.938-8.956c0-1.666,0.461-3.236,1.264-4.58 c0.799-1.351,1.947-2.473,3.322-3.237C15.934,8.673,17.425,8.261,19,8.261c1.589,0,3.087,0.419,4.381,1.156 c1.365,0.764,2.508,1.887,3.304,3.237c0.799,1.336,1.255,2.9,1.255,4.559C27.939,22.154,23.929,26.169,19,26.169',
            fillColor: '#e6005c',
            fillOpacity: 1,
            scale: 1,
            strokeWeight: 0,
            labelOrigin	: new google.maps.Point(34, 15)
        },
        label		: {
            text		: lieu.nom_str.toString(),
            color		: '#fff',
            fontSize	: '12px'
        },
        //animation	: google.maps.Animation.DROP,
        title		: lieu.nom_str
    });


    //event au clic
    marker.addListener('click', function() {
        //creation du html de la bulle
        var popup = document.createElement('div');
        popup.className = 'popup';

        var title = document.createElement('h3');
        title.className = 'popup-title';
        title.innerHTML = marker.title;

        var img = document.createElement('img');
        img.className = 'popup-img';
        img.src = lieu.couv;

        var desc = document.createElement('div');
        desc.className = 'popup-desc';
        desc.innerHTML = lieu.content;

        var score = document.createElement('div');
        score.className = 'popup-score';
        score.innerHTML = '<strong>Nom : </strong> ' + lieu.saved;

        popup.appendChild(title);
        popup.appendChild(img);
        popup.appendChild(desc);
        popup.appendChild(score);

        //ajouter le contenu à la bulle
        infowindow.setContent(popup);

        //ouvrir la bulle
        infowindow.open(gmap, marker);

        console.log(gmap.getZoom());
        if(gmap.getZoom() == 17) {
            console.log('pan');
            gmap.panTo(marker.position);
        } else {
            console.log('zoom');
            gmap.setCenter(marker.position);
            gmap.setZoom(17);
        }

    });

    return marker;
}

//ajouter l'infobulle
function addInfoWindow() {
    //creation de la fenetre d'info
    infowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });

    //event à la fermeture de la bulle
    infowindow.addListener('closeclick', function() {
        console.log('close');
        // Repositionne la carte sur la position de l'utilisateur
        gmap.setCenter(
            pos
        );
        // valeur du zoom reinitialisé
        gmap.setZoom(14);
    });
}

//callback de la map
function initMap() {
    // Récupération de la position de l'user pour centrer la carte sur lui
    navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        gmap.panTo(pos);
        console.log('position de l\'utilisateur : '+pos.lat);
    });
    //creation de la map comme variable globale centré sur pau
    gmap = new google.maps.Map(
        document.getElementById('map'),
        {
            // Zoom de la carte
            zoom: 14,
            // Position de la carte
            center: pau,
            // Controle le zoom sur la map
            scrollwheel: false,
            // Carte avec l'option street view
            streetViewControl: false,
            // Empeche de basculer sur d'autres types de cartes
            mapTypeControl: false,
            // Pour modifier le style de la carte
            styles: getMapStyle(),
            // Désactive le comportement par defaut de l'API (au dessus ça ne sert plus vraiment...)
            disableDefaultUI: true,
            // le + et - du zoom
            zoomControl: true,
            // position du zoom control
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            // type carte routière utilisé
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    );

addMarker(lieu[0]);
console.log(lieu[0]);
}