var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 4;
// var base_url = '';


function sinitializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('google_map'), {
      initMap: true,
      // styles: mapStyles,
      zoom: zoom,
      center: {
        lat: -25.344,
        lng: 131.031
      }
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: {
        lat: -25.344,
        lng: 131.031
      },
      map: map,
    });
  }
}

// window.sinitializeMAP = sinitializeMAP;
