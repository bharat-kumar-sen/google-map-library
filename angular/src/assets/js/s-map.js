// var liveUser = 0;
// var liveUser2x = 0;

var MapObj, map, map2x, zoom = 10;

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locationsMarkers;
var setCenterLatlng;
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
var property_img = "http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg";
// Info Window Content
const contentString =
  /* "<div style = 'width:200px;min-height:40px'>" + data.description + "</div>" */
  /* '<div class=infowindow>'+'<h5>Leeds</h5>'+'<p>388-A , Road no 22, Jubilee Hills, Hyderabad Telangana, INDIA-500033</p>'+'</div>' + */

  '<div id="content">' +
  '<div class="map_info_wrapper">' +
  '<a href="">' +
  '<div class="img_wrapper">' + '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg">' + '</div>' +
  '</a>' + '</div>' +
  '<h5 id="title">Heading</h5>' +
  '<div id="bodyContent">' +
  '<div class="iw-subTitle">Sub-Heading</div>'
  + "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large Heritage Site.</p>" +
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
  "(last visited June 22, 2009).</p>" +
  '<div class="iw-subTitle">Contacts :</div>' +
  // '<p class="address">Address: VISTA ALEGRE ATLANTIS, SA 3830-292 Ílhavo - Portugal </p>' +
  '<p>' +
  '<span class="address">Address: VISTA ALEGRE ATLANTIS, SA 3830-292 Ílhavo - Portugal</span>' + '</br>' +
  '<span class="Phone">Phone: +351 234 320 600</span>' + '</br>' +
  '<span class="e-mail">e-mail: geral@vaa.pt </span>' + '</br>' +
  '<span class="www">www: www.myvistaalegre.com</span>' +
  '</p>' +
  "</div>" +
  "</div>";

function sendLocationsLIst(locations) {
  if (locations === 'staticMarkers') {
    locationsMarkers = staticlocations;
    setCenterLatlng = new google.maps.LatLng(52.956622,11.223106);
  } else {
    locationsMarkers = locations;
    setCenterLatlng = new google.maps.LatLng(22.7196,75.8577);
  }
}

function sinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      // styles: mapStyles,
      zoom: 6,
      // center: new google.maps.LatLng(22.7196, 75.8577),// The marker, positioned at indore
      center: setCenterLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      /*mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: false */
    });
    setMarkers(map);
  }
}

function setMarkers(map) {  // Display multiple markers on a map
  //Create and open InfoWindow.
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
    scaledSize: new google.maps.Size(25, 25),
  };

  // Loop through our array of markers & place each one on the map
  var finalArray = locationsMarkers.map(function (obj) {
    image.url = obj.marker_image
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.location_lat, obj.location_lng),
      // position: map.getCenter(),
      map: map,
      title: obj.title,
      // shape: shape,
      animation:google.maps.Animation.DROP,
      draggable:true,
      icon: image,//if you comment this out or delete it you will get the default pin icon.
    });

    // Attach click event to the marker ,Each marker to have an info window,This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(contentString);
        // infowindow.setContent(obj.location_name);
        infowindow.open(map, marker);
      }
    })(marker, i));
  });


}

// window.sinitializeMAP = sinitializeMAP;
