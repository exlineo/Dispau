/*! Simple EU Cookies Law Compliance without dependencies by cara-tm.com, 2017. MIT license - https://github.com/cara-tm/EU-Cookies-Law-Compliance/ */
function EU_cookies_law(r) {
    'use strict';
    var msg = "Vous refusez les cookies tiers externes : aucun, à l'initiative de ce site, n'est présent sur votre appareil.",
        future = '1 Mois',
        seconds = 30,
        no_alowed_cookies = "Votre navigateur est actuellement configuré pour interdire tous Cookies (veuillez vérifier ses paramètres).";
    var domain = window.location.hostname,
        lang = (navigator.language || navigator.browserLanguage),
        countries = ['AT', 'BE', 'BG', 'HR', 'CZ', 'CY', 'DK', 'EE', 'FI', 'FR', 'DE', 'EL', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'GB', 'UK'],
        affected = 1,
        minutes = 1,
        mins = minutes,
        accept_cookies = document.getElementById('ok-cookies'),
        refuse_cookies = document.getElementById('no-cookies');
    if (false !== navigator.cookieEnabled) {
        for (var i = 0; i < countries.length; i++) {
            if (countries[i] === lang.substring(0, 2).toUpperCase()) {
                affected !== 0;
                break;
            }
        }
        if (affected !== 1) {
            sanitize_msg('');
            jsloader(r);
        } else check_cookies();
        accept_cookies.onclick = function(evt) {
            evt.preventDefault();
            launch(evt);
        };

        function launch() {
            future = Number(future.replace(/\D+$/, ''));
            var expires = new Date(new Date().setMonth(new Date().getMonth() + future));
            cookie_creation('Ok', expires);
            jsloader(r);
            sanitize_msg('');
        }
        refuse_cookies.onclick = function(evt) {
            var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
            cookie_creation('No', tomorrow);
            sanitize_msg(msg);
            evt.preventDefault();
            window.location = '';
        };

        function getCookie(sName) {
            var oRegex = new RegExp('(?:; )?' + sName + '=([^;]*);?');
            if (oRegex.test(document.cookie)) return decodeURIComponent(RegExp.$1);
            else return null;
        }

        function check_cookies() {
            tick();
            if (getCookie(domain) === 'Ok' + domain) {
                sanitize_msg('');
                jsloader(r);
            } else if (getCookie(domain) === 'No' + domain) {
                sanitize_msg(msg);
            }
        }

        function cookie_creation(c, e) {
            return document.cookie = domain + '=' + encodeURIComponent(c + domain) + ';expires=' + e.toGMTString();
        }

        function jsloader(el) {
            var s = [];
            var a = document.getElementsByTagName("script")[0];
            if (!window.scriptHasRun) {
                window.scriptHasRun = true;
                for (var i = 0; i < el.length; i++) {
                    if (el[i] !== 0 || !window.scriptHasRun) {
                        window.scriptHasRun = true;
                        s[i] = document.createElement('script');
                        s[i].src = el[i];
                        document.getElementsByTagName('head')[0].appendChild(s[i]) || a.parentNode.insertBefore(s[i], a);
                    }
                }
            }
        }

        function tick() {
            if (minutes != 0 && null !== document.getElementById('counter')) {
                var counter = document.getElementById('counter'),
                    current_minutes = mins - 1;
                seconds--;
                if (typeof counter.innerHTML !== null) counter.innerHTML = current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds);
                if (seconds > 0) {
                    setTimeout(tick, 1000);
                } else {
                    if (mins > 1) {
                        countdown(mins - 1);
                    }
                }
                if (seconds == 0) {
                    launch();
                    sanitize_msg('');
                }
            } else document.getElementById('cookies-delay').innerHTML = '';
        }
    } else {
        sanitize_msg(no_alowed_cookies);
    }

    function sanitize_msg(m) {
        document.getElementById("block-cookies").style.display = 'none';
        return document.getElementById('cookie-choices').innerHTML = '';
    }
};
EU_cookies_law(["../js/external-js.js", ""]);

/*! Google Fonts loader */
WebFontConfig = {
    google: {
        families: ['Open+Sans::latin', 'Roboto::latin']
    }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

/* Révelateur de mots de passe ; convertion possible en jQuery si nécessaire */
var pwd = document.getElementById('pwd') || document.getElementById('password'),
    eye = document.getElementById('eye');
eye.addEventListener('mousedown', function(e) {
    e.preventDefault();
    pwd.setAttribute('type', 'text');
});
eye.addEventListener('mouseup', function() {
    pwd.setAttribute('type', 'password');
});

/* Pour l'utilisation des 'dropdown buttons' ; convertion possible en jQuery si nécessaire */
var _el = document.querySelector('.btn-group .button');
if (_el) _el.onclick = function() {
    this.classList.toggle('active');
};

/*! Toggle de recherche lieu */
document.querySelector('#close').onclick = function(e) {
    var x = document.querySelector('#info').getAttribute('class');
    if (x === 'masked') {
        document.querySelector('#info').classList.remove('masked');
        this.setAttribute('title', 'Réduire');
        document.getElementById('close').classList.toggle('highlight');
    } else {
        document.querySelector('#info').classList.add('masked');
        this.setAttribute('title', 'Afficher');
    }
    e.preventDefault();
};

/*! Simple tooltips: transfert for title contents into data-tooltip attributes by cara-tm.com, MIT license. */
(function() {
    "use strict";
    if (document.querySelectorAll)
        for (var t = document.querySelectorAll("[data-tooltip]"), e = t.length; e-- > 0;) {
            var o = t[e].getAttribute("title");
            t[e].setAttribute("aria-label", o);
            t[e].removeAttribute("title");
        }
})();

/*! Toggle de messages d'alertes */
var _g = document.querySelector('#close-msg');
if (_g) {
    _g.onclick = function(e) {
        var y = document.querySelector('.msg');
        y.classList.toggle('hidden');
        e.preventDefault();
    }
};

/* UX : helper pour masquer la recherche de lieux aux clics dans le menu */
var menuLinks = document.querySelectorAll('.top-menu ul li a');
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = function() {
        if (document.querySelector('#info').getAttribute('class') !== 'masked') document.getElementById('info').classList.toggle('masked');
        document.getElementById('close').classList.toggle('highlight');
    }
};

/*!
 * @Source: https://www.taniarascia.com/google-maps-apis-for-multiple-locations/
 * @API Key:  AIzaSyBkm4blthirzCbZy1wy6GwUtxLC_jGW9rI (c'est ma clé perso ; veuillez en créer une pour DISPAU ;) )
 *
 */

/**
 * Created by alexa on 14/06/2017.
 */

    // position par défaut de la carte sur pau
var pau = {
        lat: 43.296371,
        lng: -0.370091
    };
var markers;
var infowindow;

//styliser la map
function getMapStyle() {
    var style = [{
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
            "saturation": "-100"
        }]
    },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": "-100"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
                "lightness": "30"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
                "lightness": "40"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffff00"
            }, {
                "lightness": -25
            }, {
                "saturation": -97
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "lightness": -25
            }, {
                "saturation": -100
            }]
        }
    ];

    return style;
}


//ajouter un marqueur
function addMarker(lieu) {
    console.log(lieu.sousLieux_ar.length);
    //instanciation du marqueur
    var marker = new google.maps.Marker({
        position: {
            lat: lieu.latitude_nb,
            lng: lieu.longitude_nb
        },
        map: gmap,
        icon: {
            // Le path est un fichier svg
            path: 'M19-5C6.866-5-3,4.966-3,17.214c0,2.233,0.332,4.388,0.941,6.419 c2.523,12.103,17.896,30.404,20.013,32.887C18.217,56.827,18.602,57,19,57c0.049,0,0.096,0,0.145-0.007 c0.372-0.04,0.708-0.227,0.935-0.517l0.083-0.104c4.704-5.628,17.608-21.826,19.901-32.761C40.677,21.588,41,19.439,41,17.214 C41,4.966,31.126-5,19-5 M19,26.169c-4.928,0-8.938-4.016-8.938-8.956c0-1.666,0.461-3.236,1.264-4.58 c0.799-1.351,1.947-2.473,3.322-3.237C15.934,8.673,17.425,8.261,19,8.261c1.589,0,3.087,0.419,4.381,1.156 c1.365,0.764,2.508,1.887,3.304,3.237c0.799,1.336,1.255,2.9,1.255,4.559C27.939,22.154,23.929,26.169,19,26.169',
            fillColor: '#e6005c',
            fillOpacity: 1,
            scale: 1,
            strokeWeight: 0,
            labelOrigin: new google.maps.Point(34, 15)
        },
        label: {
            text: lieu.annonces_ar.length.toString(),
            color: '#fff',
            fontSize: '12px'
        },
        //animation	: google.maps.Animation.DROP,
        title: lieu.nom_str
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
        img.src = lieu.image_img;

        var desc = document.createElement('div');
        desc.className = 'popup-desc';
        desc.innerHTML = lieu.description_str;

        var score = document.createElement('div');
        score.className = 'popup-score';
        score.innerHTML = '<strong>Nombre d\'annonces : </strong> ' + lieu.annonces_ar.length;

        popup.appendChild(title);
        popup.appendChild(img);
        popup.appendChild(desc);
        popup.appendChild(score);

        //ajouter le contenu à la bulle
        infowindow.setContent(popup);

        //ouvrir la bulle
        infowindow.open(gmap, marker);
        /*
         console.log(gmap.getZoom());
         if(gmap.getZoom() == 17) {
         console.log('pan');
         gmap.panTo(marker.position);
         } else {
         console.log('zoom');
         gmap.setCenter(marker.position);
         gmap.setZoom(17);
         }
         */
    });

    return marker;
}

//ajouter l'infobulle
function addInfoWindow() {
    //creation de la fenetre d'info
    infowindow = new google.maps.InfoWindow({
        // Dimension max de la fenêtre d'information
        maxWidth: 200
    });

    //event à la fermeture de la bulle
    infowindow.addListener('closeclick', function() {
        console.log('close');


    });
}

//callback de la google API située dans views/index.html
function initMap() {

    // Récupération de la position de l'user pour centrer la carte sur lui
    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        gmap.panTo(pos);
        console.log('position de l\'utilisateur : ' + pos.lat);
    });
    //creation de la map comme variable globale centré sur pau
    gmap = new google.maps.Map(
        document.getElementById('map'), {
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
    console.log('valeur du lieu[0] : ' + lieu[0]);
    // lieu[0] c'est un objet lieu
    addMarker(lieu[0]);
    addInfoWindow();
}