var liveUser = 0;
var liveUser2x = 0;
var type = '';
var MapObj, map, map2x, zoom = 10, InfoWObj = [];
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locationsMarkers, setCenterLatlng;

function slocationinitializeMAP(type, locations) {
  type = type;
  if (type == 'staticMarkers') {
    locationsMarkers = staticlocations;
    setCenterLatlng = new google.maps.LatLng(52.956622, 11.223106);
  } else if (type == 'dragDropMarker') {
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8785);
  } else {
    locationsMarkers = locations;
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8786);
  }

  if (google.maps) {
    map = new google.maps.Map(document.getElementById('s_location_crud_google_map'), {
      zoom: 5,
      center: setCenterLatlng,
      mapTypeId: "terrain",
    });
    search();
  }
}

var dragonMarker, autocomplete, place;

function search() {
  // Create the search box and link it to the UI element.
  const input = document.getElementById("defaultAddress");
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  dragonMarker = new google.maps.Marker({
    position: setCenterLatlng,
    map: map,
    draggable: true,
    title: "Drag me! to get location",
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    dragonMarker.setVisible(false);
    place = autocomplete.getPlace();
    searchLocation(place);
  });

  google.maps.event.addListener(dragonMarker, 'dragend', function () {
    infowindow.close();
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: dragonMarker.getPosition() },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var placeData = results[0];
          console.log('results', results);
          getMorePlaceDetails(placeData);
        }
        else {
          $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
          // window.alert('Geocode was not successful for the following reason: ' + status);
        }
      }
    );
  });
}

function getMorePlaceDetails(placeData) {
  console.log('place_id', placeData)
  var request = {
    placeId: placeData.place_id,
  };

  var service = new google.maps.places.PlacesService(map);
  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location) {
      place = place;
      searchLocation(place);
    }
  });
}

function searchLocation(place) {
  // console.log('place', place)
  if (!place.geometry || !place.geometry.location) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    window.alert("Autocomplete's returned place contains no geometry" + place.name + "'");
    return;
  }

  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  if (place.icon) {
    dragonMarker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
  }
  /*   dragonMarker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    })); */
  dragonMarker.setPosition(place.geometry.location);
  dragonMarker.setVisible(true);

  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.place_id + '<br>' + place.formatted_address + '<br>'+
  '<b class="text-primary"> URL : '+'<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' + place.url +
  '</a>' + '</b>');
  infowindow.open(map, dragonMarker);

  // Location details
  var city, state, postal_code, country, country_code;
  for (var i = 0; i < place.address_components.length; i++) {
    if (place.address_components[i].types[0] == 'postal_code') {
      postal_code = place.address_components[i].long_name;
    }
    if (place.address_components[i].types[0] == 'country') {
      country = place.address_components[i].long_name;
      country_code = place.address_components[i].short_name;
    }
    if (place.address_components[i].types[0] == 'locality') {

      city = place.address_components[i].long_name;
    }
    if (place.address_components[i].types[0] == 'administrative_area_level_1') {
      state = place.address_components[i].long_name;
    }
  }
  let currentlocationInfo = {
    location_lat: place.geometry.location.lat(),
    location_lng: place.geometry.location.lng(),
    place_Id: place.place_id,
    default_address: place.formatted_address,
    name: place.name,
    address: place.formatted_address,
    phoneNum: place.formatted_phone_number,
    InternationalPhone: place.international_phone_number,
    city: city,
    state: state,
    postal_code: postal_code,
    country: country,
    country_code: country_code,
  }
  currentlocationInfo.address = currentlocationInfo.address.replace('Unnamed Road,', '');
  callAngularFunction(currentlocationInfo);
}


function callAngularFunction(currentlocationInfo) {
  window.angularComponentReference.zone.run(() => { window.angularComponentReference.loadAngularFunction(currentlocationInfo); });
}

// ****** on edit click shows marker on map
function codeAddress(locationAddress) {
  const infowindow = new google.maps.InfoWindow();
  geocoder = new google.maps.Geocoder();
  var address = locationAddress;
  geocoder.geocode({
    'latLng': address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var dragPlaceData = results[0];
      getMorePlaceDetails(dragPlaceData)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// window.sinitializeMAP = sinitializeMAP;
