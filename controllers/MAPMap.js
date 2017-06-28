/**
 * Created by alexa on 15/06/2017.
 */

function MAPMap(uiGmapGoogleMapApi, $scope) {

    // var uiGmapGoogleMapApi = les choses récupérées depuis l'API google


    //Initialisation des variables
    $scope.map = {
        center: {
            latitude: 43.2936835, //Position initial de la carte
            longitude: -0.3756524
        },
        zoom: 11 // de 0 à 19, 0 étant la valeur de zoom la plus forte
    };

    $scope.markers = [{
        coord: [
            43.2936835, //Coordonnées où placer le point
            -0.3756524
        ],
        email: "netapsys@netapsys.fr", //Propriété métier, pour les afficher à l'utilisateur lorsqu'il sélectionne le point par exemple
        icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png", //Icone personnalisée
        id: 412
    },{
        coord: [
            46.5132,
            0.1033
        ],
        email: "netapsys@netapsys.fr",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", //Icone personnalisée
        id: 413
    }];

    $scope.clickMarker = function(marker) {
        alert(marker.email); //Affichera l'email du point sur lequel on a cliqué
    };

    uiGmapGoogleMapApi.then(function(maps) {
        var richmarkerScript = document.createElement('script');
        richmarkerScript.type = 'application/javascript';
        richmarkerScript.src = 'bower_components/js-rich-marker/src/richmarker-compiled.js';

        var markerCluster = document.createElement('script');
        markerCluster.type = 'application/javascript';
        markerCluster.src = 'bower_components/markerclustererplus/dist/markerclusterer.min.js';

        var markerWithLabelScript = document.createElement('script');
        markerWithLabelScript.type = 'application/javascript';
        markerWithLabelScript.src = 'bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js';

        var infoBoxScript = document.createElement('script');
        infoBoxScript.type = 'application/javascript';
        infoBoxScript.src = 'bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js';

        var keydragzoomScript = document.createElement('script');
        keydragzoomScript.type = 'application/javascript';
        keydragzoomScript.src = 'bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js';

        document.body.appendChild(richmarkerScript);
        document.body.appendChild(markerCluster);
        document.body.appendChild(markerWithLabelScript);
        document.body.appendChild(infoBoxScript);
        document.body.appendChild(keydragzoomScript);
    });

}