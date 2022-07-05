var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 6;

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locationsMarkers;

function sendLocationsLIst(locations) {
  if (locations === 'staticMarkers') {
    locationsMarkers = staticlocations;
    console.log("locationsMarkers staticMarkers === 1 ", locationsMarkers);
  } else {
    locationsMarkers = locations;
    console.log("locationsMarkers DbMarkers === 2 ", locationsMarkers);
  }
}

var staticlocations = [
  { Id: 1, location_name: 'Indore', location_lat: 22.7196, location_lng: 75.8577, marker_image: '/assets/marker/indore.jpg', title: "Indore Location" },
  { Id: 2, location_name: 'Bhopal', location_lat: 23.2599, location_lng: 77.4126, marker_image: '/assets/marker/bhopal.jpg', title: "Bhopal" },
  { Id: 3, location_name: 'Raisen', location_lat: 23.3327, location_lng: 77.7824, marker_image: '/assets/marker/raisen.jpg', title: "Raisen" },
  { Id: 4, location_name: 'Ujjain', location_lat: 23.1765, location_lng: 75.7885, marker_image: '/assets/marker/ujjain.jpg', title: "Ujjain" },
  { Id: 5, location_name: 'Dewas', location_lat: 22.9676, location_lng: 76.0534, marker_image: '/assets/marker/dewas.jpg', title: "Dewas" },
  { Id: 6, location_name: 'Shajapur', location_lat: 23.4273, location_lng: 76.273, marker_image: '/assets/marker/shajapur.jpg', title: "Shajapur" },
  { Id: 7, location_name: 'Jabalpur', location_lat: 23.1815, location_lng: 79.9864, marker_image: '/assets/marker/jabalpur.jpg', title: "Jabalpur" },
  { Id: 8, location_name: 'Raipur', location_lat: 21.25, location_lng: 81.63, marker_image: '/assets/marker/raipur.jpg', title: "Raipur" },
  { Id: 9, location_name: 'Mumbai', location_lat: 18.5204, location_lng: 73.8567, marker_image: '/assets/marker/mumbai.jpg', title: "Mumbai" },
  { Id: 10, location_name: 'Pune', location_lat: 18.5204, location_lng: 73.8567, marker_image: '/assets/marker/pune.jpg', title: "Pune" },
  { Id: 11, location_name: 'Agra', location_lat: 27.1767, location_lng: 78.0081, marker_image: '/assets/marker/agra.jpg', title: "Agra" },
  { Id: 12, location_name: 'Delhi', location_lat: 28.7041, location_lng: 77.1025, marker_image: '/assets/marker/delhi.jpg', title: "Delhi" },
  { Id: 13, location_name: 'Jaipur', location_lat: 26.9124, location_lng: 75.7873, marker_image: '/assets/marker/jaipur.jpg', title: "Jaipur" },
  { Id: 14, location_name: 'Bengaluru', location_lat: 12.9716, location_lng: 77.5946, marker_image: '/assets/marker/banglore.jpg', title: "Bengaluru" }
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
  var finalArray = locationsMarkers.map(function (obj) {
    image.url = obj.marker_image
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.location_lat, obj.location_lng),
      map: map,
      title: obj.title,
      // shape: shape,
      icon: image,
    });
    // Each marker to have an info window,This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(obj.location_name);
        infowindow.open(map, marker);
      }
    })(marker, i));
  });
}

// window.sinitializeMAP = sinitializeMAP;



// using array of arrray statis data
/* var staticlocations = [
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
]; */

/*   // Loop through our array of markers & place each one on the map
  for (i = 0; i < staticlocations.length; i++) {
    image.url = staticlocations[i][3]
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(staticlocations[i][1], staticlocations[i][2]),
      map: map,
      title: staticlocations[i][0],
      // shape: shape,
      // icon: staticlocations[i][3],
      icon: image,
    });

    // Each marker to have an info window,This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(staticlocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  } */
