// var liveUser = 0;
// var liveUser2x = 0;
// var MapObj, map, map2x, zoom = 1.8;

// function rinitializeMAP() {
//   if (google.maps) {
//     map = new google.maps.Map(document.getElementById('google_map'), {
//       zoom: zoom,
//       center: {
//         lat: 52.520008,
//         lng: 13.404954
//       }
//     })
//   }
// }

// var liveUser = 0;
// var liveUser2x = 0;

// var MapObj, map, map2x, zoom = 1.8;
// // var base_url = '';


// function rinitializeMAP() {
//   if (google.maps) {
//     map = new google.maps.Map(document.getElementById('google_map'), {
//       // styles: mapStyles,
//       zoom: zoom,
//       center: {
//         lat: 52.520008,
//         lng: 13.404954
//       }
//     })
//   }
// }

var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 6;
var locations = [
  ['Indore', 22.7196, 75.8577],
  ['Bhopal', 23.2599, 77.4126],
  ['Ujjain', 23.1765, 75.7885],
  ['Dewas', 22.9676, 76.0534]
];


function rinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP

    });

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

window.rinitializeMAP = rinitializeMAP;
