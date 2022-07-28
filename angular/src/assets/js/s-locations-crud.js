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
    // locationsMarkers = singlelocations;
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8785);
    console.log('setCenterLatlng==0', setCenterLatlng);
  } else {
    locationsMarkers = locations;
    setCenterLatlng = new google.maps.LatLng(22.7209, 75.8786);
    console.log('setCenterLatlng==1', setCenterLatlng);
  }

  if (google.maps) {
    map = new google.maps.Map(document.getElementById('s_location_crud_google_map'), {
      zoom: 5,
      center: setCenterLatlng,
      mapTypeId: "terrain",
    });
    // dragDrop();
    search();
  }
}

var dragonMarker, autocomplete, place;

function search() {
  // Create the search box and link it to the UI element.
  const input = document.getElementById("defaultAddress");
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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

/*   google.maps.event.addListener(dragonMarker, 'dragend', function () {
    // geocodePosition();
    infowindow.close();
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: dragonMarker.getPosition() },
      function (results, status) {
        console.log('results', results);
        if (status == google.maps.GeocoderStatus.OK) {
          var placeData = results[0];
          getMorePlaceDetails(placeData);
        }
        else {
          $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
          // window.alert('Geocode was not successful for the following reason: ' + status);
        }
      }
    );
  }); */
}

function getMorePlaceDetails(placeData) {
  console.log('place_id ===1', placeData.place_id)
  var request = {
    // placeId: placeData.place_id,
    placeId: 'ChIJTWePSxT9YjkRvNqu0ByXjjY',
    // fields: ['name', 'rating', 'formatted_phone_number', 'geometry','international_phone_number','icon','icon_background_color','icon_mask_base_uri','photos','url']
  };

  var service = new google.maps.places.PlacesService(map);
  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK&&
      place &&
      place.geometry &&
      place.geometry.location) {
      place = place;
      console.log('place==0', place);
      searchLocation(place);
    }
  });
}

function searchLocation(place) {
  console.log('place ==', place)

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
  // marker.setIcon(({
  dragonMarker.setIcon(({
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35, 35)
  }));
  /* marker.setPosition(place.geometry.location);
  marker.setVisible(true); */
  dragonMarker.setPosition(place.geometry.location);
  dragonMarker.setVisible(true);

  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.place_id + '<br>' + place.formatted_address);
  // infowindow.open(map, marker);
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
  // console.log('currentlocationInfo == search', currentlocationInfo);
  currentlocationInfo.address = currentlocationInfo.address.replace('Unnamed Road,', '');
  callAngularFunction(currentlocationInfo);
}

//drag and drop marker to get position on map
// var dragonMarker
function dragDrop() {
  // Place a draggable marker on the map
  dragonMarker = new google.maps.Marker({
    // position: setCenterLatlng,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    // icon: image,//if you comment this out or delete it you will get the default pin icon.
    title: "Drag me!"
  });

  google.maps.event.addListener(dragonMarker, 'dragend', function () {
    geocodePosition();
  });
}

function geocodePosition() {
  infowindow.close();
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

// ****** on table row click shows marker on map
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
// ****** on table row click shows marker on map

// window.sinitializeMAP = sinitializeMAP;
