var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 6;

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.

function sendLocationsLIst(markersList){
  console.log("==============", markersList);
}

var locations = [
  ['Indore', 22.7196, 75.8577, 'assets/marker/indore.jpg', 14],
  ['Bhopal', 23.2599, 77.4126, 'assets/marker/bhopal.jpg', 13],
  ['Raisen', 23.3327, 77.7824, 'assets/marker/raisen.jpg', 12],
  ['Ujjain', 23.1765, 75.7885, 'assets/marker/ujjain.jpg', 11],
  ['Dewas', 22.9676, 76.0534, 'assets/marker/dewas.jpg', 10],
  ['Shajapur', 23.4273, 76.2730, 'assets/marker/shajapur.jpg', 9],
  ['Jabalpur', 23.1815, 79.9864, 'assets/marker/jabalpur.jpg', 8],
  ['Raipur', 21.250000, 81.629997, 'assets/marker/raipur.jpg', 7],
  ['Mumbai', 19.0760, 72.8777, 'assets/marker/mumbai.jpg', 6],
  ['Pune', 18.5204, 73.8567, 'assets/marker/pune.jpg', 5],
  ['Agra', 27.1767, 78.0081, 'assets/marker/agra.jpg', 4],
  ['Delhi', 28.7041, 77.1025, 'assets/marker/delhi.jpg', 3],
  ['Jaipur', 26.9124, 75.7873, 'assets/marker/jaipur.jpg', 2],
  ['Bengaluru', 12.9716, 77.5946, 'assets/marker/banglore.jpg', 1],
];

function sinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      // styles: mapStyles,
      zoom: zoom,
      center: new google.maps.LatLng(22.7196, 75.8577),// The marker, positioned at indore
      mapTypeId: google.maps.MapTypeId.ROADMAP
      /*mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: false */
    });
    setMarkers(map);
  }
}


function setMarkers(map) {

  // Display multiple markers on a map
  var infowindow = new google.maps.InfoWindow(), marker, i;

  // var iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

  let image = {
    url: "",
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };

  // Loop through our array of markers & place each one on the map
  for (i = 0; i < locations.length; i++) {
    image.url = locations[i][3]
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      title: locations[i][0],
      // shape: shape,
      // icon: locations[i][3],
      icon: image,
    });

    // Each marker to have an info window,This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

// window.sinitializeMAP = sinitializeMAP;
