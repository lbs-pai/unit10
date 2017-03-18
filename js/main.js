var reservationData = {};

var config = {
    apiKey: "AIzaSyDi20QTqLu0LIPJE7aLdTCILYlN3W8nArk",
    authDomain: "reservation-site-1c6d4.firebaseapp.com",
    databaseURL: "https://reservation-site-1c6d4.firebaseio.com",
    storageBucket: "reservation-site-1c6d4.appspot.com",
    messagingSenderId: "531006344900"
};

firebase.initializeApp(config);
var database = firebase.database();

$('.reservation-day li a').click(function(e) {
    var data = $(e.target).text();
    $('.dropdown-toggle').text(data);
    reservationData.day = data;

});

$('.reservations').on('submit', function(e) {
    e.preventDefault();
    reservationData.name = $('.reservation-name').val();
    database.ref('reservations').push(reservationData);
});

$('#getReservations').on('submit', function(e) {
    e.preventDefault();
    this.submit();
});

// on initial load and addition of each reservation update the view
database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.8054491,
            lng: -73.9654415
        },
        zoom: 18,
        scrollwheel: false,
        styles: [{
            "featureType": "landscape",
            "stylers": [{
                "hue": "#eaeaea"
            }, {
                "saturation": -20
            }, {
                "lightness": 100
            }, {
                "gamma": 1
            }, {
                "visibility": 'simplified'
            }]
        }, {
            "featureType": "road.highway",
            "stylers": [{
                 "hue": "#eaeaea"
            }, {
                "saturation": -20
            }, {
                "lightness": 100
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "road.arterial",
            "stylers": [{
                "hue": "#eaeaea"
            }, {
                "saturation": -20
            }, {
                "lightness": 100
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "hue": "#eaeaea"
            }, {
                "saturation": -100
            }, {
                "lightness": 52
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "hue": "#008080"
            }, {
                "saturation": -13.200000000000003
            }, {
                "lightness": 2.4000000000000057
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "hue": "#0e2046"
            }, {
                "saturation": -1.0989010989011234
            }, {
                "lightness": 11.200000000000017
            }, {
                "gamma": 1
            }]
        }]
    });

    var marker = new google.maps.Marker({
        position: {
            lat: 40.8054491,
            lng: -73.9654415
        },
        map: map,
        title: 'Lucy\'s Pizzeria'
    });
}
