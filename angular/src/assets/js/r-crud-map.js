function initializeMAP() {
  type = type
  let zoom = 3;
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('r_google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.718361, 75.884271)
    });
  }
  draggableMarkers();
  getGooglePlaceId();
}

function getGooglePlaceId() {
  var request = {
    location: map.getCenter(),
    radius: '500',
    query: 'Google Sydney'
  };

  var service = new google.maps.places.PlacesService(map);
  // console.log('service===', service);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    });
    // console.log("markerplace==============", place.locations)
  }
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
  // console.log('myDraggableMarker===', myDraggableMarker);
  new google.maps.Geocoder().geocode({
      'latLng': myDraggableMarker.getPosition(),
      'placeId': myDraggableMarker.getPlace(),
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        addressInfo = {
          lat: addresslat = myDraggableMarker.getPosition().lat(),
          lng: addresslng = myDraggableMarker.getPosition().lng(),
          placeId: results[0].place_id,
          city: results[0].geometry.location,
          address: results[0].formatted_address,
          postelCode: 452001,
          country: 'SomeWare inside the world',
          countryCode: 91,
          state: 'M.P'
        }
        infowindow.setContent(
          "Latitude:- " +
          addresslat +
          "</br>" +
          "\nLongitude:-" +
          addresslng +
          "</br>" +
          "\nPlace ID:-" +
          results[0].place_id +
          "</br>" +
          // "\nCiry:-" +
          // results[0].geometry.location +
          // "</br>" +
          "\nAddress:-" +
          results[0].formatted_address
        );
        infowindow.open(map, myDraggableMarker);
        // addressInfo.location_name = addressInfo.location_name.replace('Google ke pas eska data ni hai ;-)*,', '');
        callAngularFunction(addressInfo);
        document.getElementById("myLocationForm").reset();
        searchBox();
      }
    }
  )
}

function callAngularFunction(addressInfo) {
  // console.log('Looking for addressInfo-----', addressInfo);

  window.angularComponentReference.zone.run(() => {
    window.angularComponentReference.loadAngularFunction(addressInfo);
  });
}

function searchBox() {
  var searchBox = new google.maps.places.SearchBox(document.getElementById('mySearchBox'));
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mySearchBox'));
  google.maps.event.addListener(searchBox, 'places_changed', function () {
    searchBox.set('map', null);
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;
    for (i = 0; place = places[i]; i++) {
      (function (place) {
        // console.log('Looking for placesssss-----', place);
        var marker = new google.maps.Marker({
          position: place.geometry.location
        });
        marker.bindTo('map', searchBox, 'map');
        google.maps.event.addListener(marker, 'map_changed', function () {
          if (!this.getMap()) {
            this.unbindAll();
          }
        });
        bounds.extend(place.geometry.location);
      }(place));
    }
    map.fitBounds(bounds);
    searchBox.set('map', map);
    map.setZoom(Math.min(map.getZoom(), 12));
  });
}
google.maps.event.addDomListener(window, 'load', searchBox);
