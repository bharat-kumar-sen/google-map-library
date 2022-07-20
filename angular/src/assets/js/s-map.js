var liveUser = 0;
var liveUser2x = 0;
var type = '';
var MapObj, map, map2x, zoom = 10, InfoWObj = [];
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locationsMarkers;
var clusterLocationsMarkers;
var setCenterLatlng;

var singlelocations = [
  { Id: 1, location_name: 'Treasure Island Mall', location_lat: 22.7209, location_lng: 75.8785, marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', title: "Treasure Island" },
];

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

// function sendLocationsLIst(locations) {
// }

function sinitializeMAP(type, locations) {
  type = type;
  if (type == 'staticMarkers') {
    locationsMarkers = staticlocations;
    setCenterLatlng = new google.maps.LatLng(52.956622, 11.223106);
  } else if (type == 'dragDropMarker') {
    // locationsMarkers = singlelocations;
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8785);
  }
  else if (type == 'clusterMarkers') {
    clusterLocationsMarkers = locations;
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8785);
    // setCenterLatlng = new google.maps.LatLng(-28.024, 140.887);
  }
  else {
    locationsMarkers = locations;
    console.log('dbMarkers', locationsMarkers);
    setCenterLatlng = new google.maps.LatLng(22.7196, 75.8577);
  }

  if (google.maps) {
    map = new google.maps.Map(document.getElementById('s_google_map'), {
      // styles: mapStyles,
      zoom: 5,
      center: setCenterLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      /* mapTypeId: google.maps.MapTypeId.TERRAIN,
         mapTypeControl: false */
    });
    if (type == 'dragDropMarker') {
      dragDrop();
    } else if (type == 'clusterMarkers') {
      clusterMarkers();
    } else {
      setMarkers();
    }
  }
}

function setMarkers() {  // Display multiple markers on a map
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
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.location_lat, obj.location_lng),
      // position: map.getCenter(),
      map: map,
      title: obj.title,
      // shape: shape,
      animation: google.maps.Animation.DROP,
      draggable: false,
      icon: image,//if you comment this out or delete it you will get the default pin icon.
      optimized: false,
    });

    // Attach click event to the marker ,Each marker to have an info window,This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(contentString);
        // infowindow.setContent(obj.location_name);
        // infoWindow.setContent(marker.getTitle());
        infowindow.open(map, marker);
        /* map.panTo(this.getPosition());
           map.setZoom(20); */
      }
    })(marker, i));
  });

}

//drag and drop marker to get position on map
var dragonMarker
function dragDrop() {
  // Place a draggable marker on the map
  dragonMarker = new google.maps.Marker({
    position: setCenterLatlng,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: "Drag me!"
  });

  google.maps.event.addListener(dragonMarker, 'dragend', function () {
    geocodePosition();
  });
}

function geocodePosition() {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: dragonMarker.getPosition() },
    function (results, status) {
      console.log('results', results);
      if (status == google.maps.GeocoderStatus.OK) {
        $("#mapSearchInput").val(results[0].formatted_address);
        $("#mapErrorMsg").hide(100);
        // infoWindow.close();
        /* var currentLatitude = dragonMarker.getPosition().lat().toFixed(7);
        var currentLongitude = dragonMarker.getPosition().lng().toFixed(7); */
        var value = results[0].formatted_address.split(",");
        count = value.length;
        country = value[count - 1];
        state = value[count - 2];
        city = value[count - 3];
        // console.log('count ==',count,'country ==',country,'state ==',state,'city ==',city);
        let currentlocationInfo = {
          location_name: city,
          location_lat: results[0].geometry.location.lat(),
          location_lng: results[0].geometry.location.lng(),
          location_address: results[0].formatted_address,
          location_state: state,
          location_country: country,
        }

        const infowindow = new google.maps.InfoWindow(
          {
            content: "Latitude: " + currentlocationInfo.location_lat + "</br></br>" + "\nLongitude: " + currentlocationInfo.location_lng + "</br></br>" + "\nAddress: " + currentlocationInfo.location_address,
          }
        );

        closeOtherInfo();
        InfoWObj[0] = infowindow;
        infowindow.open(map, dragonMarker);

        currentlocationInfo.location_address = currentlocationInfo.location_address.replace('Unnamed Road,', '');
        callAngularFunction(currentlocationInfo);
      }
      else {
        $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
      }
    }
  );
}

function closeOtherInfo() {
  if (InfoWObj.length > 0) {
    /* detach the info-window from the marker ... undocumented in the API docs */
    InfoWObj[0].setContent("dragonMarker", null);
    /* and close it */
    InfoWObj[0].close();
    /* blank the array */
    InfoWObj.length = 0;
  }
}

function callAngularFunction(currentlocationInfo) {
  window.angularComponentReference.zone.run(() => { window.angularComponentReference.loadAngularFunction(currentlocationInfo); });
}

function geocodeLatLng(latlng) {
  console.log('latlng==js', latlng);
  geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        // map.setZoom(11);
        const addressMarker = new google.maps.Marker({
          position: latlng,
          map: map,
          draggable: true,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, addressMarker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function codeAddress(locationAddress) {
  const infowindow = new google.maps.InfoWindow();
  geocoder = new google.maps.Geocoder();
  var address = locationAddress;
  // console.log('address ==',address);
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      if (dragonMarker) {
        dragonMarker.setMap(null);
        if (infowindow) infowindow.close();
      }
      dragonMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: results[0].geometry.location
      });
      google.maps.event.addListener(dragonMarker, 'dragend', function () {
        geoPosition(dragonMarker.getPosition());
      });
      google.maps.event.addListener(dragonMarker, 'click', function () {
        if (dragonMarker.formatted_address) {
          infowindow.setContent(dragonMarker.formatted_address + "<br>coordinates: " + dragonMarker.getPosition().toUrlValue(6));
        } else {
          infowindow.setContent(address + "<br>coordinates: " + dragonMarker.getPosition().toUrlValue(6));
        }
        infowindow.open(map, dragonMarker);
      });
      google.maps.event.trigger(dragonMarker, 'click');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geoPosition(pos) {
  console.log('latlng==js', pos);
  geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  geocoder.geocode({
    latLng: pos
  }, function (responses) {
    if (responses && responses.length > 0) {
      dragonMarker.formatted_address = responses[0].formatted_address;
    } else {
      dragonMarker.formatted_address = 'Cannot determine address at this location.';
    }
    infowindow.setContent(dragonMarker.formatted_address + "<br>coordinates: " + dragonMarker.getPosition().toUrlValue(6));
    infowindow.open(map, dragonMarker);
  });
}

function clusterMarkers() {
  // const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  console.log('clusterLocationsMarkers', clusterLocationsMarkers)
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  const markers = clusterLocationsMarkers.map((position, i) => {
    position = {
      lat : position.location_lat,
      lng : position.location_lng
    }
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
      // icon: "url to the file",
      // adjust zIndex to be above other markers
      // zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

// window.sinitializeMAP = sinitializeMAP;
