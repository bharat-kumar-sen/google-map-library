var map;

function rinitializeMAP() {
  let zoom = 8;
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.718361, 75.884271)
    });
    customMarker(map);
  }
}

var locations = [{
    id: 01,
    title: "This is Indore",
    name: "Indore",
    lat: 22.7196,
    lng: 75.8577,
    imsg: 'assets/marker/indore.jpg',
    infoWin: '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Indore</h1>' +
      '<div id="bodyContent">' +
      "<p>Around 600 BCE, Ujjain emerged as the political, commercial and cultural centre of Malwa plateau. The ancient walled city of Ujjain was located around the Garh Kalika hill on the bank of river Kshipra, in the present-day suburban areas of the Ujjain city. This city covered an irregular pentagonal area of 0.875 km2.</p>" +
      '<p>Attribution: Uluru, <a href="https://commons.wikimedia.org/wiki/File:Ujjain.jpg">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>"
  },
  {
    id: 02,
    title: "This is Bhopal",
    name: "Bhopal",
    lat: 23.2599,
    lng: 77.4126,
    imsg: 'assets/marker/bhopal.jpg',
    infoWin: '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Bhopal</h1>' +
      '<div id="bodyContent">' +
      "<p>Around 600 BCE, Ujjain emerged as the political, commercial and cultural centre of Malwa plateau. The ancient walled city of Ujjain was located around the Garh Kalika hill on the bank of river Kshipra, in the present-day suburban areas of the Ujjain city. This city covered an irregular pentagonal area of 0.875 km2.</p>" +
      '<p>Attribution: Uluru, <a href="https://commons.wikimedia.org/wiki/File:Ujjain.jpg">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>"
  },
  {
    id: 03,
    title: "This is Dawas",
    name: "Dawas",
    lat: 22.9676,
    lng: 76.0534,
    imsg: 'assets/marker/dewas.jpg',
    infoWin: '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Dawas</h1>' +
      '<div id="bodyContent">' +
      "<p>Around 600 BCE, Ujjain emerged as the political, commercial and cultural centre of Malwa plateau. The ancient walled city of Ujjain was located around the Garh Kalika hill on the bank of river Kshipra, in the present-day suburban areas of the Ujjain city. This city covered an irregular pentagonal area of 0.875 km2.</p>" +
      '<p>Attribution: Uluru, <a href="https://commons.wikimedia.org/wiki/File:Ujjain.jpg">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>"
  },
  {
    id: 04,
    title: "This is Ujjain",
    name: "Ujjain",
    lat: 23.1765,
    lng: 75.7885,
    imsg: 'assets/marker/ujjain.jpg',
    infoWin: '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Ujjain</h1>' +
      '<div id="bodyContent">' +
      "<p>Around 600 BCE, Ujjain emerged as the political, commercial and cultural centre of Malwa plateau. The ancient walled city of Ujjain was located around the Garh Kalika hill on the bank of river Kshipra, in the present-day suburban areas of the Ujjain city. This city covered an irregular pentagonal area of 0.875 km2.</p>" +
      '<p>Attribution: Uluru, <a href="https://commons.wikimedia.org/wiki/File:Ujjain.jpg">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>"
  }
];

function customMarker(map) {

  var infowindow = new google.maps.InfoWindow(),
    marker, i;

  let cityImage = {
    url: '',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(15, 20),
    anchor: new google.maps.Point(0, 0)
  };

  var finalArray = locations.map(function (obj) {
    cityImage.url = obj.imsg
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.lat, obj.lng),
      map: map,
      title: obj.title,
      icon: cityImage,
      // animation: google.maps.Animation.BOUNCE,
    });
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(obj.infoWin);
        infowindow.open(map, marker);
      }
    })(marker, i));
  });
}
