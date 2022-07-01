var liveUser = 0;
var liveUser2x = 0;

var MapObj, map, map2x, zoom = 1.8;
// var base_url = '';


function initializeMAP() {
  if (google.maps) {
    map = new google.maps.Map(document.getElementById('Map_canvas'), {
      initMap: true,
      // styles: mapStyles,
      zoom: zoom,
      center: {
        lat: 52.520008,
        lng: 13.404954
      }
    })
  }
}
