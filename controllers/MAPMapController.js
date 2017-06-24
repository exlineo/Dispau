

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


function afficheMap(NgMap) {

    var vmm = this;

    NgMap.getMap('dispauCarte').then(function(map) {
        vmm.map = map;
        // ajout du style de la map
        vmm.map.setOptions({styles: styleMap});

        vmm.map.onClick = function() {
            alert('Carte cliquée');
        }
    });

    vmm.positions1 = [
        { pos: [40.11, -0.21], name: 1 }, { pos: [40.22, -0.10], name: 2 },
        { pos: [40.33, -0.99], name: 3 }, { pos: [40.44, -0.88], name: 4 },
        { pos: [40.55, -0.77], name: 5 }, { pos: [40.66, -0.66], name: 6 }
    ];

    vmm.positions2 = [
        { pos: [40.71, -0.21], name: 1 }, { pos: [41.72, -0.20], name: 2 },
        { pos: [40.73, -0.19], name: 3 }, { pos: [40.74, -0.18], name: 4 },
        { pos: [40.75, -0.17], name: 5 }, { pos: [43.76, -0.16], name: 6 }
    ];

    vmm.setPositions = function(pos) {
        vmm.positions = angular.copy(pos);
    };

    vmm.setPositions(vmm.positions2);
    vmm.currentIndex = 0;
    vmm.selectNextCustomMarker = function() {
    }

}