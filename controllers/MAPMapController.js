var pau = {
    lat: 43.300000,
    lng: -0.366667
}

//style de la map

var styleMap = [{
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



function afficheMap(NgMap, DBManager) {

    var vmm = this;

    vmm.onClick = function (e, lieu) {
        console.log(lieu);
        vmm.lieu = lieu;
        vmm.map.showInfoWindow('infosCarte', "lieu-" + lieu.id_nb);
    };
    console.log("valeur de ngmap ", NgMap);
    // console.log("valeur de la position du navigateur ", navigator.geolocation.getCurrentPosition());

    NgMap.getMap('dispauCarte').then(function (map) {
        vmm.map = map;
        console.log("valeur de map ", map);

        // ajout du style de la map
        vmm.map.setOptions({styles: styleMap});

        vmm.map.setCenter(pau);

        vmm.map.onClick = function () {
            alert('Carte cliquée');
        }
    });

    DBManager('LIELieu').all()
        .then(function (lieu) {
            vmm.lieux = lieu;
            vmm.lieu = vmm.lieux[0];
            console.log(vmm.lieu);

        });


    vmm.setPositions = function (pos) {
        vmm.positions = angular.copy(pos);
    };

    vmm.setPositions(vmm.lieux);
    vmm.currentIndex = 0;
    vmm.selectNextCustomMarker = function () {
    }

}