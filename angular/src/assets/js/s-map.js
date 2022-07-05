// var liveUser = 0;
// var liveUser2x = 0;

var MapObj, map, map2x, zoom = 10;

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locationsMarkers;
var staticlocations = [
  { Id: 1, location_name: 'Germany', location_lat: 52.956622, location_lng: 11.223106, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Germany" },
  { Id: 2, location_name: 'Hamburg', location_lat: 53.55002464, location_lng: 9.999999144, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Hamburg" },
  { Id: 3, location_name: 'Berlin', location_lat: 52.52181866, location_lng: 13.40154862, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Berlin" },
  { Id: 4, location_name: 'Netherlands', location_lat: 53.272666, location_lng: 7.028446, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Netherlands" },
  { Id: 5, location_name: 'Ireland', location_lat: 52.955368, location_lng: -7.800643, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Ireland" },
  { Id: 6, location_name: 'France', location_lat: 46.552664, location_lng: 2.422229, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "France" },
  { Id: 7, location_name: 'Poland', location_lat: 51.624980, location_lng: 20.816150, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Poland" },
  { Id: 8, location_name: 'Switzerland', location_lat: 47.361750, location_lng: 7.508110, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Switzerland" },
  { Id: 9, location_name: 'Sweden', location_lat: 58.968180, location_lng: 16.200450, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Sweden" },
  { Id: 10, location_name: 'United Kingdom', location_lat: 49.238740, location_lng: -2.173634, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "United Kingdom" },
];

  // Info Window Content
  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
  '<div id="bodyContent">' +
  "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
  "sandstone rock formation in the southern part of the " +
  "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
  "south west of the nearest large town, Alice Springs; 450&#160;km " +
  "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
  "features of the Uluru - Kata Tjuta National Park. Uluru is " +
  "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
  "Aboriginal people of the area. It has many springs, waterholes, " +
  "rock caves and ancient paintings. Uluru is listed as a World " +
  "Heritage Site.</p>" +
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
  "(last visited June 22, 2009).</p>" +
  "</div>" +
  "</div>";


function sendLocationsLIst(locations) {
  if (locations === 'staticMarkers') {
    locationsMarkers = staticlocations;
    console.log("locationsMarkers staticMarkers === 1 ", locationsMarkers);
  } else {
    locationsMarkers = locations;
    console.log("locationsMarkers DbMarkers === 2 ", locationsMarkers);
  }
}

function sinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      // styles: mapStyles,
      zoom: 6,
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
  var infowindow = new google.maps.InfoWindow(
    /* {
    content: contentString,
    maxWidth: 200,} */
    ), marker, i;

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
        // infowindow.setContent(contentString);
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
