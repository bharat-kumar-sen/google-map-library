var map;
var locations = [{
    Id: 1,
    location_name: 'Indore',
    location_lat: 22.7196,
    location_lng: 75.8577,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/indore.jpg',
    title: 'Indore Location'
  },
  {
    Id: 2,
    location_name: 'Bhopal',
    location_lat: 23.2599,
    location_lng: 77.4126,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/bhopal.jpg',
    title: 'Bhopal Location'
  },
  {
    Id: 4,
    location_name: 'Ujjain',
    location_lat: 23.1765,
    location_lng: 75.7885,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/ujjain.jpg',
    title: 'Ujjain Location'
  },
  {
    Id: 5,
    location_name: 'Dewas',
    location_lat: 22.9676,
    location_lng: 76.0534,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/dewas.jpg',
    title: 'Dewas Location'
  },
];

function rinitializeMAP() {
  let zoom = 8;
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('r_google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.718361, 75.884271)
    });
    customMarker(locations);
  }
}

function customMarker(locations) {
  console.log("locations", )
  var infowindow = new google.maps.InfoWindow(),
    marker, i;

  let cityImage = {
    url: '',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(15, 20),
    anchor: new google.maps.Point(0, 0)
  };

  var finalArray = locations.map(function (obj) {
    cityImage.url = obj.marker_image
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.location_lat, obj.location_lng),
      map: map,
      title: obj.title,
      icon: cityImage,
      animation: google.maps.Animation.BOUNCE,
    });
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(obj.infoWin);
        infowindow.open(map, marker);
      }
    })(marker, i));
  });
}

function sandLocationList(type, locations) {
  if (locations) {
    customMarker(locations);
  }
}
