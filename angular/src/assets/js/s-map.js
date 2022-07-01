var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 6;
var locations = [
  ['Indore', 22.7196, 75.8577, 4],
  ['Bhopal', 23.2599, 77.4126, 5],
  ['Raisen', 23.3327, 77.7824, 5],
  ['Ujjain', 23.1765, 75.7885, 3],
  ['Dewas', 22.9676, 76.0534, 2],
  ['Shajapur', 23.4273, 76.2730, 2],
  ['Jabalpur', 23.1815, 79.9864, 1],
  ['Raipur', 21.250000, 81.629997, 1],
  ['Mumbai', 19.0760, 72.8777],
  ['Pune', 18.5204, 73.8567],
  ['Agra', 27.1767, 78.0081,2],
  ['Delhi', 28.7041, 77.1025,1],
  ['Jaipur',26.9124, 75.7873],
  ['Bengaluru',12.9716, 77.5946],

];


function sinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      // styles: mapStyles,
      zoom: zoom,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
      /*       mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: false */
    });
    // The marker, positioned at indore

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
}

// window.sinitializeMAP = sinitializeMAP;
