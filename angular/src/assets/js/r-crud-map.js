var place;

function initializeMAP() {
  type = type
  let zoom = 3;
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('r_google_map'), {
      zoom: zoom,
      center: new google.maps.LatLng(22.718361, 75.884271)
    });
  }
  initFunctions();
}

function initFunctions() {
  getGooglePlaceId();
  draggableMarkers();
}

function getGooglePlaceId() {
  var request = {
    location: map.getCenter(),
    radius: '500',
    query: 'Google Sydney'
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var idMarkerInfo = new google.maps.Marker({
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    });
  }
}

// function searchBox() {
//   var searchBox = new google.maps.places.SearchBox(document.getElementById('mySearchBox'));
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mySearchBox'));
//   google.maps.event.addListener(searchBox, 'places_changed', function () {
//     searchBox.set('map', null);
//     var places = searchBox.getPlaces();
//     var bounds = new google.maps.LatLngBounds();
//     var i, place;
//     for (i = 0; place = places[i]; i++) {
//       (function (place) {
//         // console.log('Looking for placesssss-----', place);
//         var marker = new google.maps.Marker({
//           position: place.geometry.location
//         });
//         marker.bindTo('map', searchBox, 'map');
//         google.maps.event.addListener(marker, 'map_changed', function () {
//           if (!this.getMap()) {
//             this.unbindAll();
//           }
//         });
//         bounds.extend(place.geometry.location);
//       }(place));
//     }
//     map.fitBounds(bounds);
//     searchBox.set('map', map);
//     map.setZoom(Math.min(map.getZoom(), 12));
//   });
//   extDisplayInfo(results, status);
// }
// google.maps.event.addDomListener(window, 'load', searchBox);

function draggableMarkers() {
  if (myDraggableMarker) {
    myDraggableMarker.setMap(null);
  }
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

function dragMarkerPosition(myDraggableMarker, location) {
  new google.maps.Geocoder().geocode({
      'latLng': myDraggableMarker.getPosition(),
      'placeId': myDraggableMarker.getPlace(),
    },

    function extDisplayInfo(results, status) {
      console.log('Testing all location data====', results);
      if (status == google.maps.GeocoderStatus.OK) {
        var arrAddress = results;
        var locality = '';
        var country = '';
        var zipcode = '';
        var state = '';
        var countryCode = '';
        // console.log("results[0]", results[0]);
        for (var j = 0; j < results[0].address_components.length; j++) {
          if (results[0].address_components[j].types[0] == "locality") {
            // console.log("town:" + results[0].address_components[j].long_name);
            locality = results[0].address_components[j].long_name;
          }
          if (results[0].address_components[j].types[0] == "country") {
            // console.log("country:" + results[0].address_components[j].long_name);
            country = results[0].address_components[j].long_name;
            countryCode = results[0].address_components[j].short_name;
          }
          if (results[0].address_components[j].types[0] == "postal_code") {
            // console.log("postalCode:" + results[0].address_components[j].long_name);
            zipcode = results[0].address_components[j].long_name;
          }
          if (results[0].address_components[j].types[0] == "administrative_area_level_1") {
            // console.log("state:" + results[0].address_components[j].long_name);
            state = results[0].address_components[j].long_name;
          }
        }
        addressInfo = {
          lat: addresslat = myDraggableMarker.getPosition().lat(),
          lng: addresslng = myDraggableMarker.getPosition().lng(),
          placeId: results[0].place_id,
          city: locality,
          address: results[0].formatted_address,
          phoneNum: results[0].formatted_phone_number,
          postelCode: zipcode,
          country: country,
          countryCode: countryCode,
          state: state
        }
        infowindow.setContent(
          "\nCiry:-" +
          locality +
          "</br>" +
          "Latitude:- " +
          addresslat +
          "</br>" +
          "\nLongitude:-" +
          addresslng +
          "</br>" +
          "\nPlace ID:-" +
          results[0].place_id +
          "</br>" +
          "\nAddress:-" +
          results[0].formatted_address
        );
        infowindow.open(map, myDraggableMarker);
        callAngularFunction(addressInfo);
        // searchBox();
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

function moveMarkerTdClick(addressInfo) {
  // console.log('addressInfoaddressInfo', addressInfo);
  const infowindow = new google.maps.InfoWindow();
  if (myDropMarker) {
    myDropMarker.setMap(null);
  }
  if (addressInfo) {
    myDropMarker = new google.maps.Marker({
      position: new google.maps.LatLng(addressInfo.lat, addressInfo.lng),
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
      // addresslat +
      "</br>" +
      "\nLongitude:" +
      // addresslng +
      "</br>" +
      "\nAddress:"
      // results[0].formatted_address
    );
    infowindow.open(map, myDropMarker);
  }
}
