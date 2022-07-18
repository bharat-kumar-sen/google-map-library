var map;
var type;
var marker;
var myDropMarker;
var myDraggableMarker;
var infowindow = new google.maps.InfoWindow();
var staticLocations = [{
    Id: 1,
    location_name: 'Smith Center',
    location_lat: 39.779823,
    location_lng: 98.787064,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/indore.jpg',
    title: 'Smith Center Location'
  },
  {
    Id: 2,
    location_name: 'Chicago',
    location_lat: 41.8781,
    location_lng: 87.6298,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/bhopal.jpg',
    title: 'Chicago Location'
  },
  {
    Id: 4,
    location_name: 'San Diego',
    location_lat: 32.7157,
    location_lng: 117.1611,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/ujjain.jpg',
    title: 'San Diego Location'
  },
  {
    Id: 5,
    location_name: 'San Francisco',
    location_lat: 37.7749,
    location_lng: 122.4194,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/dewas.jpg',
    title: 'San Francisco Location'
  },
];
var infoWindoMarkers = [{
    Id: 6,
    location_name: 'France',
    location_lat: 46.552664,
    location_lng: 2.422229,
    marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title: "France"
  },
  {
    Id: 7,
    location_name: 'Poland',
    location_lat: 51.624980,
    location_lng: 20.816150,
    marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title: "Poland"
  },
  {
    Id: 8,
    location_name: 'Switzerland',
    location_lat: 47.361750,
    location_lng: 7.508110,
    marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title: "Switzerland"
  },
  {
    Id: 10,
    location_name: 'United Kingdom',
    location_lat: 49.238740,
    location_lng: -2.173634,
    marker_image: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title: "United Kingdom"
  },
  {
    Id: 1,
    location_name: 'Smith Center',
    location_lat: 39.779823,
    location_lng: 98.787064,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/indore.jpg',
    title: 'Smith Center Location'
  },
  {
    Id: 2,
    location_name: 'Chicago',
    location_lat: 41.8781,
    location_lng: 87.6298,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/bhopal.jpg',
    title: 'Chicago Location'
  },
  {
    Id: 4,
    location_name: 'San Diego',
    location_lat: 32.7157,
    location_lng: 117.1611,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/ujjain.jpg',
    title: 'San Diego Location'
  },
  {
    Id: 5,
    location_name: 'San Francisco',
    location_lat: 37.7749,
    location_lng: 122.4194,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/dewas.jpg',
    title: 'San Francisco Location'
  },
]

const infoWindo =
  '<div id="content">' +
  '<div class="map_info_wrapper">' +
  '<a href="">' +
  '<div class="img_wrapper">' + '<img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80">' + '</div>' +
  '</a>' + '</div>' +
  '<h5 id="title">TechnoJerrys City</h5>' +
  '<div id="bodyContent">' +
  '<div class="iw-subTitle">City of Love</div>' +
  "<p>The internet’s source of freely-usable images Powered by creators everywhere</p>" +
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
  "(last visited June 22, 2009).</p>" +
  '<div class="iw-subTitle">Contacts :</div>' +
  '<p>' +
  '<span class="address">Address: VISTA ALEGRE ATLANTIS, SA 3830-292 Ílhavo - Portugal</span>' + '</br>' +
  '<span class="Phone">Phone: +351 234 320 600</span>' + '</br>' +
  '<span class="e-mail">e-mail: geral@vaa.pt </span>' + '</br>' +
  '<span class="www">www: www.myvistaalegre.com</span>' +
  '</p>' +
  "</div>" +
  "</div>";

function rinitializeMAP(type, locations) {
  type = type
  let zoom = 3;
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('r_google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.718361, 75.884271)
    });
    if (type === 'rStaticMarkers') {
      customMarker(staticLocations);
    } else if (type === 'rDynamicMarkers') {
      customMarker(locations);
    } else if (type === 'rInfoWindoMarkers') {
      rInfoWindoMarkers(infoWindoMarkers);
    } else if (type === 'rDragAndDropMarkers') {
      draggableMarkers();
    } else if (type === 'rDragMarkerOnPosition') {
      moveMarkerTdClick();
    }
  }

}

function customMarker(staticLocations) {
  let cityImage = {
    url: '',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(15, 20),
    anchor: new google.maps.Point(0, 0)
  };
  let customMarkerArray = staticLocations.map(function (obj) {
    cityImage.url = obj.marker_image
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.location_lat, obj.location_lng),
      map: map,
      title: obj.title,
      icon: cityImage,
      animation: google.maps.Animation.DROP,
    });
  });
}

function rInfoWindoMarkers(infoWindoMarkers) {
  let cityImage = {
    url: '',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(15, 20),
    anchor: new google.maps.Point(0, 0)
  };

  let customMarkerArray = infoWindoMarkers.map(function (infoObj) {
    cityImage.url = infoObj.marker_image
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(infoObj.location_lat, infoObj.location_lng),
      center: new google.maps.LatLng(46.552664, 2.422229),
      map: map,
      title: infoObj.title,
      icon: cityImage,
      animation: google.maps.Animation.DROP,
    });
    google.maps.event.addListener(marker, 'click', (function (marker) {
      return function () {
        infowindow.setContent(infoWindo);
        infowindow.open(map, marker);
      }
    })(marker));
  });
}

function draggableMarkers() {
  const infowindow = new google.maps.InfoWindow();
  myDraggableMarker = new google.maps.Marker({
    position: new google.maps.LatLng(22.718361, 75.884271),
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: "Please drag me!"
  });

  google.maps.event.addListener(myDraggableMarker, 'dragend', function () {
    dragMarkerPosition(myDraggableMarker);
  });
}

function dragMarkerPosition(myDraggableMarker) {
  new google.maps.Geocoder().geocode({
      'latLng': myDraggableMarker.getPosition()
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        addressInfo = {
          location_lat: addresslat = myDraggableMarker.getPosition().lat(),
          location_lng: addresslng = myDraggableMarker.getPosition().lng(),
          location_name: results[0].formatted_address,
          title: results[0].formatted_address,
          marker_image: 'My Location image'
        }
        infowindow.setContent(
          "Latitude: " +
          addresslat +
          "</br>" +
          "\nLongitude:" +
          addresslng +
          "</br>" +
          "\nAddress:" +
          results[0].formatted_address
        );
        infowindow.open(map, myDraggableMarker);
        addressInfo.location_name = addressInfo.location_name.replace('Google ke pas eska data ni hai ;-)*,', '');
        callAngularFunction(addressInfo);
      }
    }
  )
}

function callAngularFunction(addressInfo) {
  window.angularComponentReference.zone.run(() => {
    window.angularComponentReference.loadAngularFunction(addressInfo);
  });
}

function moveMarkerTdClick(addressInfo) {
  console.log('addressInfoaddressInfo', addressInfo)
  const infowindow = new google.maps.InfoWindow();
  if (myDropMarker) {
    myDropMarker.setMap(null);
  }
  if (addressInfo) {
    myDropMarker = new google.maps.Marker({
      position: new google.maps.LatLng(addressInfo.location_lat, addressInfo.location_lng),
      map: map,
      animation: google.maps.Animation.DROP,
    });
    infowindow.setContent(
      '<div id="content">' +
      '<div class="map_info_wrapper">' +
      '<a href="">' +
      '<div class="img_wrapper">' + '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9YSkJq_hgJvYhMvVatqATlw-IqugNFVDHA&usqp=CAU">' + '</div>' +
      '</a>' + '</div>' +
      "</br>" +
      "Latitude: " +
      addressInfo.location_lat +
      "</br>" +
      "\nLongitude:" +
      addressInfo.location_lng +
      "</br>" +
      "\nAddress:" +
      addressInfo.title
    );
    infowindow.open(map, myDropMarker);
    addressInfo.location_name = addressInfo.location_name.replace('Google ke pas eska data ni hai ;-)*,', '');
  }
}
