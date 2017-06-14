    /*! Simple EU Cookies Law Compliance without dependencies by cara-tm.com, 2017. MIT license - https://github.com/cara-tm/EU-Cookies-Law-Compliance/ */
    function EU_cookies_law(r){'use strict';var msg="Vous refusez les cookies tiers externes : aucun, à l'initiative de ce site, n'est présent sur votre appareil.",
        future='1 Mois',
        seconds=30,
        no_alowed_cookies="Votre navigateur est actuellement configuré pour interdire tous Cookies (veuillez vérifier ses paramètres).";
        var domain=window.location.hostname,lang=(navigator.language||navigator.browserLanguage),countries=['AT','BE','BG','HR','CZ','CY','DK','EE','FI','FR','DE','EL','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','SK','SI','ES','SE','GB','UK'],affected=1,minutes=1,mins=minutes,accept_cookies=document.getElementById('ok-cookies'),refuse_cookies=document.getElementById('no-cookies');if(false!==navigator.cookieEnabled){for(var i=0;i<countries.length;i++){if(countries[i]===lang.substring(0,2).toUpperCase()){affected!==0;break;}}if(affected!==1){sanitize_msg('');jsloader(r);}else check_cookies();accept_cookies.onclick=function(evt){evt.preventDefault();launch(evt);};function launch(){future=Number(future.replace(/\D+$/, ''));var expires=new Date(new Date().setMonth(new Date().getMonth()+future));cookie_creation('Ok',expires);jsloader(r);sanitize_msg('');}refuse_cookies.onclick=function(evt){var tomorrow=new Date(new Date().setDate(new Date().getDate()+1));cookie_creation('No',tomorrow);sanitize_msg(msg);evt.preventDefault();window.location='';};function getCookie(sName){var oRegex=new RegExp('(?:; )?'+sName+'=([^;]*);?');if(oRegex.test(document.cookie)) return decodeURIComponent(RegExp.$1);else return null;}function check_cookies(){tick();if(getCookie(domain)==='Ok'+domain){sanitize_msg('');jsloader(r);}else if(getCookie(domain)==='No'+domain){sanitize_msg(msg);}}function cookie_creation(c,e){return document.cookie=domain+'='+encodeURIComponent(c+domain)+';expires='+e.toGMTString();}function jsloader(el){var s=[];var a=document.getElementsByTagName("script")[0];if(!window.scriptHasRun){window.scriptHasRun=true;for(var i=0;i<el.length;i++){if(el[i]!==0||!window.scriptHasRun){window.scriptHasRun=true;s[i]=document.createElement('script');s[i].src=el[i];document.getElementsByTagName('head')[0].appendChild(s[i])||a.parentNode.insertBefore(s[i],a);}}}}function tick(){if(minutes!=0&&null!==document.getElementById('counter')){var counter=document.getElementById('counter'),current_minutes=mins-1;seconds--;if(typeof counter.innerHTML!==null)counter.innerHTML=current_minutes.toString()+':'+(seconds<10?'0':'')+String(seconds);if(seconds>0){setTimeout(tick,1000);}else{if(mins>1){countdown(mins-1);}}if(seconds==0){launch();sanitize_msg('');}}else document.getElementById('cookies-delay').innerHTML='';}}else{sanitize_msg(no_alowed_cookies);}function sanitize_msg(m){document.getElementById("block-cookies").style.display='none';return document.getElementById('cookie-choices').innerHTML='';}};
EU_cookies_law(["../js/external-js.js", ""]);

/*! Google Fonts loader */
WebFontConfig={google:{families:['Open+Sans::latin','Roboto::latin']}};(function(){var wf=document.createElement('script');wf.src=('https:'==document.location.protocol?'https':'http')+'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';wf.type='text/javascript';wf.async='true';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(wf,s); })();

/* Révelateur de mots de passe ; convertion possible en jQuery si nécessaire */
var pwd=document.getElementById('pwd')||document.getElementById('password'),eye=document.getElementById('eye');eye.addEventListener('mousedown',function(e){e.preventDefault();pwd.setAttribute('type','text');});eye.addEventListener('mouseup',function(){pwd.setAttribute('type','password');});

/* Pour l'utilisation des 'dropdown buttons' ; convertion possible en jQuery si nécessaire */
var _el=document.querySelector('.btn-group .button');if(_el)_el.onclick=function(){this.classList.toggle('active');};

/*! Toggle de recherche lieu */
document.querySelector('#close').onclick=function(e){var x=document.querySelector('#info').getAttribute('class');if(x==='masked'){document.querySelector('#info').classList.remove('masked');this.setAttribute('title','Réduire');document.getElementById('close').classList.toggle('highlight');}else{document.querySelector('#info').classList.add('masked');this.setAttribute('title','Afficher');}e.preventDefault();};

/*! Simple tooltips: transfert for title contents into data-tooltip attributes by cara-tm.com, MIT license. */
(function(){"use strict";if(document.querySelectorAll)for(var t=document.querySelectorAll("[data-tooltip]"),e=t.length;e-->0;){var o=t[e].getAttribute("title");t[e].setAttribute("aria-label",o);t[e].removeAttribute("title");}})();

/*! Toggle de messages d'alertes */
var _g=document.querySelector('#close-msg');if(_g){_g.onclick=function(e){var y=document.querySelector('.msg');y.classList.toggle('hidden');e.preventDefault();}};

/* UX : helper pour masquer la recherche de lieux aux clics dans le menu */
var menuLinks=document.querySelectorAll('.top-menu ul li a');for(var i=0;i<menuLinks.length;i++){menuLinks[i].onclick=function(){if(document.querySelector('#info').getAttribute('class')!=='masked')document.getElementById('info').classList.toggle('masked');document.getElementById('close').classList.toggle('highlight');}};

/*!
 * @Source: https://www.taniarascia.com/google-maps-apis-for-multiple-locations/
 * @API Key:  AIzaSyBkm4blthirzCbZy1wy6GwUtxLC_jGW9rI (c'est ma clé perso ; veuillez en créer une pour DISPAU ;) )
 *
 */

function initMap() {
    var beaumont = {
        info: '<strong>Palais Beaumont</strong><br>\
		Allée Alfred de Musset<br> 64000 Pau<br>\
		<a href="https://www.google.fr/maps/place/Palais+Beaumont+-+Centre+de+Congr%C3%A8s+Historique/@43.295448,-0.3620232,17z/data=!4m5!3m4!1s0x0:0x41ad40ac6be0e288!8m2!3d43.2946982!4d-0.3624094">Localiser</a>',
        lat: 43.2946984,
        long: -0.3645981,
        label: 12,
        persons: 56
    };
    var parcbeaumont = {
        info: '<strong>Hôtel Parc Beaumont</strong><br>\
		MGallery by Sofitel<br> 1 Avenue Edouard VII<br> 64000 Pau<br>\
		<a href="https://www.google.fr/maps/place/H%C3%B4tel+Parc+Beaumont+Pau+MGallery+by+Sofitel/@43.295448,-0.3620232,17z/data=!4m5!3m4!1s0x0:0x6032f82053a5e806!8m2!3d43.2973712!4d-0.359534">Localiser</a>',
        lat: 43.295448,
        long: -0.3620232,
        persons: 3
    };
    var pautheatre = {
        info: '<strong>Théâtre de Pau</strong><br>\r\
		8 Rue Maréchal Foch<br> 64000 Pau<br>\
		<a href="https://www.google.fr/maps/place/Pau\'s+Th%C3%A9%C3%A2tre/@43.2960102,-0.364641,17z/data=!4m5!3m4!1s0x0:0xa73469402524048b!8m2!3d43.2969778!4d-0.367291">Localiser</a>',
        lat: 43.2960102,
        long: -0.364641,
        persons: 12
    };
    var gretapau = {
        info: '<strong>Greta Béarn-Soule</strong><br>\r\
		3 Bis Avenue Nitot<br> 64000 Pau<br>\
		<a href="https://www.google.fr/maps/place/Gr%C3%A9ta+B%C3%A9arn+Soule/@43.2973845,-0.3566934,17z/data=!4m5!3m4!1s0xd5648e6dfca3837:0x8d092792c1354faf!8m2!3d43.2973806!4d-0.3545047">Localiser</a>',
        lat: 43.2973845,
        long: -0.3566934,
        persons: 23
    };
    var pauparcexpos = {
        info: '<strong>Parc des Expositions</strong><br>\r\
		7 Boulevard Champetier de Ribes<br> 64000 Pau<br>\
		<img src="upload/parc-des-expositions-pau-mini.jpg" alt="" />\
		<a href="https://www.google.fr/maps/place/Parc+Des+Expositions/@43.3049039,-0.3791547,17z/data=!3m1!4b1!4m5!3m4!1s0xd564f34816cc5ad:0xdda6f31828f90593!8m2!3d43.3049!4d-0.376966">Localiser</a>',
        lat: 43.3049039,
        long: -0.3791547,
        persons: 5
    }
    var locations = [
        [beaumont.info, beaumont.lat, beaumont.long, beaumont.persons, 0],
        [parcbeaumont.info, parcbeaumont.lat, parcbeaumont.long, parcbeaumont.persons,1],
        [pautheatre.info, pautheatre.lat, pautheatre.long, pautheatre.persons, 2],
        [gretapau.info, gretapau.lat, gretapau.long, gretapau.persons, 3],
        [pauparcexpos.info, pauparcexpos.lat, pauparcexpos.long, pauparcexpos.persons, 4]
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        /* Choisissez le style de Map en ligne : https://snazzymaps.com  */
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}],
        /* END STYLE */
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        center: new google.maps.LatLng(43.2946984,-0.3645981),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow({}), marker, i;
    var custom_icon = {
        path: 'M19-5C6.866-5-3,4.966-3,17.214c0,2.233,0.332,4.388,0.941,6.419 c2.523,12.103,17.896,30.404,20.013,32.887C18.217,56.827,18.602,57,19,57c0.049,0,0.096,0,0.145-0.007 c0.372-0.04,0.708-0.227,0.935-0.517l0.083-0.104c4.704-5.628,17.608-21.826,19.901-32.761C40.677,21.588,41,19.439,41,17.214 C41,4.966,31.126-5,19-5 M19,26.169c-4.928,0-8.938-4.016-8.938-8.956c0-1.666,0.461-3.236,1.264-4.58 c0.799-1.351,1.947-2.473,3.322-3.237C15.934,8.673,17.425,8.261,19,8.261c1.589,0,3.087,0.419,4.381,1.156 c1.365,0.764,2.508,1.887,3.304,3.237c0.799,1.336,1.255,2.9,1.255,4.559C27.939,22.154,23.929,26.169,19,26.169',
        fillColor: '#e6005c',
        fillOpacity: 1,
        scale: 1,
        strokeWeight: 0
    };
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon: custom_icon,
            label: locations[i][3],
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
};