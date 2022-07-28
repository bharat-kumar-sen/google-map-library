var GetMap = function (mapDiv, options) {
  var _map;
  var _markers = [];
  var _marker;
  var trafficLayer;
  var _polylines = [];
  var _markerClusters = [];
  var _infoWindow = new google.maps.InfoWindow();
  var _bounds = new google.maps.LatLngBounds();
  var _geocoder = new google.maps.Geocoder;
  var _directionsService = new google.maps.DirectionsService();
  var _service = new google.maps.DistanceMatrixService();
  var _streetViewService = new google.maps.StreetViewService();
  var _options = {
    mapDiv: mapDiv,
    mapOptions: {
      center: {
        lat: 48.918579,
        lng: 9.153950
      },
      zoom: 12,
      //heading: 90,
      // tilt: 45,
      //gestureHandling: "greedy",
      zoom: options.zoom,
      //  minZoom:options.minZoom,
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: false,
      streetViewControl: options.street_view,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    }
  };

  /* Load options for map*/
  if (options) {
    _LoadOptions(options);
    this.options = _options.mapOptions;
  }

  /* Initiate the map */
  function _Init(_options) {
    /* create google map object */
    //console.log(_options.mapOptions);
    _map = new google.maps.Map(document.getElementById(_options.mapDiv), _options.mapOptions);

    /* Set all the options */
    _map.setOptions(_options.mapOptions);

    /*Create map legend*/
    if (_options.mapOptions.sitetype == 'web') {
      _map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('oc-mylocation-button'));
    } else {
      _map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('oc-mylocation-button'));
      _map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('oc-search-box-1'));
      _map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('oc-result-button'));
    }

    /* Call function after map load */
    if (_options.mapOptions.callback != undefined) {
      /* add listner once for map load */
      google.maps.event.addListenerOnce(_map, 'idle', function () {
        /* call call back function after map load*/
        if (typeof _options.mapOptions.callback == 'function') {
          _options.mapOptions.callback.call();
        }
      });
    }
    var op = _options.mapOptions.mapPan;

    if (op != undefined) {
      //console.log(op);
      google.maps.event.addListener(_map, 'dragend', function () {
        _map.setOptions({
          minZoom: _options.mapOptions.min_zoom
        })
        _setmapPanfunction(op)
      });

      // google.maps.event.addListener(_map, 'zoom_changed', _setmapPanfunction(op));

      google.maps.event.addDomListener(_map.getDiv(), 'mousewheel', function () {
        //console.log(_options.mapOptions.min_zoom)
        _map.setOptions({
          minZoom: _options.mapOptions.min_zoom
        })
        _setmapPanfunction(op);
      });
      google.maps.event.addDomListener(_map.getDiv(), 'DOMMouseScroll', function () {
        //  console.log(_options.mapOptions.min_zoom)
        _map.setOptions({
          minZoom: _options.mapOptions.min_zoom
        })
        _setmapPanfunction(op);
      });
    }
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, _options.mapOptions);

    zoomControlDiv.index = 1;
    _map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

    /* call goelocate if set to default*/
    if (_options.mapOptions.Geolocation)
      _Geolocation(_options.mapOptions.Geolocation);
    /* Call autocomplete if set to default */
    if (_options.mapOptions.AutoComplete)
      _AutoComplete(_options.mapOptions.AutoComplete);
    if (_options.mapOptions.legend) {
      var legend = document.getElementById(_options.mapOptions.legend);
      _map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);
    }
  }

  /* Load options*/
  function _LoadOptions(options) {
    for (optionName in options) {
      _options.mapOptions[optionName] = options[optionName];
    }
    if (options.initMap)
      _Init(_options);
  }
  // map pan function

  function _setmapPanfunction(op) {

    if (_markers[3] != undefined && _markers[3].length > 0) {
      return false;
    }
    if (op.button) {
      if (document.getElementById('oc-show-more-button') == null) {
        var legend = document.getElementById('oc-show-more-legend');

        var div = document.createElement('div');
        var btn = '<button type="button" id="oc-show-more-button" class="oc-show-more-button" style="display:block; font-family:' + op.style['font-family'] + '">' + op.name + '</button>';
        div.innerHTML = btn;
        legend.appendChild(div);
        jQuery('#oc-show-more-button').click(function () {
          op.onclick.call();
        });
        jQuery(legend).css({
          'width': jQuery(legend).find("#oc-show-more-button").innerWidth()
        })
        if (op.device == 'mobile') {
          _map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(legend);
        } else {
          _map.controls[google.maps.ControlPosition.TOP_CENTER].push(legend);
        }
      } else {
        var x = document.getElementById("oc-show-more-button");
        if (x != null && x.style.display === "none") {
          x.style.display = "block";
        }
      }
    } else {
      op.onclick.call();
    }
  }

  function _GetStreetView(latlng, radius, divname) {
    _streetViewService.getPanorama({
      location: latlng,
      radius: radius
    }, function (data, status) {
      if (status === 'OK') {

        jQuery('#' + divname).css('min-height', '400px');
        var panorama = new google.maps.StreetViewPanorama(document.getElementById(divname));
        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);
      } else {
        jQuery('#' + divname).css('min-height', '0px').html('<h2>' + lang_json.no_streetview_msg + '</h2>');
      }
    });
  }

  /* Get the user location */
  function _Geolocation(options) {
    if (navigator.geolocation) {
      if (jQuery("#oc-autocomplete").val().length > 0) {
        return false;
      }
      /* Get the current user location */
      navigator.geolocation.getCurrentPosition(function (position) {

        jQuery('#' + options.SetAddress).html('Getting your locations');

        /* hold the location in a cariable */
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(typeof options.MapCenter, options.MapCenter)
        /* Set the mapcenter if set to true */
        if (options.MapCenter === true) {
          _map.setCenter(pos);
        }
        /* Check the callback function to trigger after getting the location */
        if (options.callback != undefined && typeof options.callback == 'function') {
          var a = new Array({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          options.callback.apply(null, a);
        }

      }, function (position) {
        if (options.Errorcallback != undefined && typeof options.Errorcallback == 'function') {
          options.Errorcallback.apply();
        }
        //console.log(position);
      });
    } else {
      console.log('Failed');
    }
  }

  /* Create single marker */
  function _createSingleMarker(data) {

    var m = new google.maps.Marker(data);
    m.data = data;
    m.setMap(_map);

    /* check if infowindow is set to true */
    if (data.infowindow) {
      google.maps.event.addDomListener(m, 'click', (function (e) {

        //slideScroll(this.count);
        if (this.infowindowContent != undefined && this.infowindowContent != '') {

          jQuery('#infobox').html(this.infowindowContent);
          _infoWindow.setPosition(this.position); // set the position of infowindow
          _infoWindow.setContent(this.infowindowContent); // set the content of infowindow
          _infoWindow.open(_map, this); // open the infowindow
        }

      }));
    }

    if (data.trigger) {
      /* tigger the click event on markers */
      google.maps.event.trigger(m, 'click');
    }

    if (data.onclick) {

      /* add click event on markers */
      google.maps.event.addDomListener(m, 'click', (function (e) {

        if (typeof data.onclick == 'function')
          data.onclick.call(null, this);
      }));
    }
    /* check if dragend event is set to true */
    if (data.draggable) {
      google.maps.event.addDomListener(m, 'dragend', function (event) {
        var lat = event.latLng.lat(),
          Lng = event.latLng.lng();
        if (data.draggableCallbackFun) {
          _geocodeByLatLng(lat, Lng, data.draggableCallbackFun);
        } else {
          _geocodeByLatLng(lat, Lng);
        }
      });
      /* add click event on markers */
      google.maps.event.addDomListener(m, 'click', (function (e) {
        if (typeof data.onclick == 'function')
          data.onclick.call(null, this);
      }));
    }
    if (data.mouseover) {

      /* add click event on markers */
      google.maps.event.addDomListener(m, 'mouseover', (function (e) {
        if (this.infowindowContent != undefined && this.infowindowContent != '') {
          _infoWindow.setPosition(this.position); // set the position of infowindow
          _infoWindow.setContent(this.infowindowContent); // set the content of infowindow
          _infoWindow.open(_map, this); // open the infowindow
        }
        if (typeof data.mouseover == 'function') {
          data.mouseover.call(null, this);
        }

      }));
    }
    if (data.mouseout) {
      /* add click event on markers */
      google.maps.event.addDomListener(m, 'mouseout', (function (e) {
        if (this.infowindowContent != undefined) {
          _infoWindow.close(); // close the infowindow
        }
        if (typeof data.mouseout == 'function')
          data.mouseout.call(null, this);
      }));
    }
    return m;
  }

  /* remove group of markers with indexing */
  function _clearMarkers(i, clearCluster) {
    var temp = _markers[i];
    _markers[i] = [];

    if (temp != undefined) {

      var len = temp.length;
      if (_markerClusters[i] && clearCluster == 1) {
        _markerClusters[i].clearMarkers();
        if (options.clusterSetting.clusteByTopic && _markers.topic_cluster) {
          _markers.topic_cluster.forEach((markerObj, objKey) => {
            if (_markers.topic_cluster[objKey] && _markers.topic_cluster[objKey].length > 0) {
              _markerClusters[objKey].clearMarkers();
            }
          })
        }
      }
      for (var j = 0; j < len; j++) {
        if (temp[j] != undefined && temp[j] != '') {
          temp[j].setMap(null);
        }
      }
    }
  }

  /* Create polyline */
  function _createPolyline(data) {
    var poly = new google.maps.Polyline(data);
    poly.data = data;
    poly.setMap(_map);
    return poly;
  }

  /* remove polyline from map*/

  function _clearPolylines(i) {
    var temp = _polylines[i];
    _polylines[i] = [];
    if (temp != undefined) {
      var len = temp.length;
      for (var j = 0; j < len; j++) {
        temp[j].setMap(null);
      }

    }
  }

  /* Autocomplete function for place library */
  function _AutoComplete(options) {
    if (options != undefined) {
      var input = document.getElementById(options.input);
      /* create object for autocomplete class */
      if (_options.mapOptions.google_type == "all") {
        var autocomplete = new google.maps.places.Autocomplete(input, {
          types: []
        });
      } else {
        var autocomplete = new google.maps.places.Autocomplete(input, {
          types: [_options.mapOptions.google_type]
        });
      }

      if (options.country_code) {
        autocomplete.setComponentRestrictions({
          'country': [options.country_code]
        });
      }
      // if(options.result_type !=undefined){
      //   autocomplete.setTypes(options.result_type);
      //
      // }else{
      //   autocomplete.setTypes([]);
      //
      // }
      if (options.sessionToken) {
        autocomplete.setOptions({
          'sessionToken': options.sessionToken
        });
      }

      autocomplete.bindTo('bounds', _map);

      autocomplete.setFields(['address_components', 'formatted_address', 'geometry', 'name', 'place_id']);

      autocomplete.addListener('place_changed', function () {
        /* get the place */
        var place = autocomplete.getPlace();
        if (options.callback != undefined && typeof options.callback == 'function')
          options.callback.call(null, place);
      });
    }

  }

  function ZoomControl(controlDiv, op) {

    // Creating divs & styles for custom zoom control
    controlDiv.style.padding = '5px';

    // Set CSS for the control wrapper
    var controlWrapper = document.createElement('div');
    controlWrapper.classList.add('oc-controlWrapper');
    controlWrapper.style.backgroundColor = 'white';
    controlWrapper.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px'
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '32px';
    controlWrapper.style.height = '64px';
    controlDiv.appendChild(controlWrapper);

    // Set CSS for the zoomIn
    var zoomInButton = document.createElement('div');
    /* Change this to be the .png image you want to use */
    zoomInButton.classList.add('oc-btn-zoomin');
    zoomInButton.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A")';
    controlWrapper.appendChild(zoomInButton);

    // Set CSS for the zoomOut
    var zoomOutButton = document.createElement('div');
    /* Change this to be the .png image you want to use */
    zoomOutButton.classList.add('oc-btn-zoomout');
    zoomOutButton.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A")';
    controlWrapper.appendChild(zoomOutButton);

    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function () {
      if (op != undefined) {
        _setmapPanfunction(op.mapPan)
      }
      _map.setZoom(_map.getZoom() + 1);
    });

    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function () {
      if (op != undefined) {
        _setmapPanfunction(op.mapPan)
      }
      //console.log(op.min_zoom,_map.getZoom() - 1);
      if (_map.getZoom() > op.min_zoom) {
        _map.setZoom(_map.getZoom() - 1);
      }

    });

  }

  function _getGeoCode(arg) {
    var request = {};
    if (arg.language != undefined) {
      request.language = arg.language;
    }

    if (arg.country_code != undefined) {
      request = {
        'region': arg.country_code,
        componentRestrictions: {
          country: arg.country_code
        }
      };
    }

    if (arg.type == 'zipcode') {
      request.componentRestrictions.postalCode = arg.q;
    } else if (arg.type == 'latlng') {
      request.location = {
        lat: parseFloat(arg.lat),
        lng: parseFloat(arg.lng)
      }
    } else {
      request.address = arg.q;
    }

    _geocoder.geocode(request, function (results, status) {
      var p = {
        results: results,
        status: status
      }
      if (arg.callback != undefined && typeof arg.callback == 'function') {
        arg.callback.call(null, p);
      }

    });
  }

  function _getDirection(arg) {

    var request = {
      origin: arg.origin,
      destination: arg.destination,
      travelMode: arg.mode.toUpperCase(),
      drivingOptions: {
        trafficModel: 'optimistic'
      }
    };

    if (arg.departure_time != undefined) {
      request.drivingOptions.departureTime = new Date(arg.departure_time);
    }

    if (arg.language != undefined) {
      request.language = arg.language;
    }

    _directionsService.route(
      request,
      function (response, status) {

        if (status === 'OK') {
          var p = {
            geocoded_waypoints: response.geocoded_waypoints,
            status: response.status,
            route: response.routes[0]
          }
          if (arg.callback != undefined && typeof arg.callback == 'function') {
            arg.callback.call(null, p);
          }
        } else {
          var p = {
            status: status
          }
          console.log('Directions request failed due to ' + status);
          if (arg.callback != undefined && typeof arg.callback == 'function') {
            arg.callback.call(null, p);
          }

        }
      });
  }

  function _getDistanceMatrix(arg) {

    var request = {
      origins: [{
        lat: parseFloat(arg.elat),
        lng: parseFloat(arg.elng)
      }],
      destinations: [{
        lat: parseFloat(arg.olat),
        lng: parseFloat(arg.olng)
      }]
    };
    if (arg.mode != undefined) {
      request.travelMode = arg.mode.toUpperCase();
    }

    if (arg.country_code != undefined) {
      request.region = arg.country_code;
    }

    //console.log(arg.departure_time);

    if (arg.departure_time != undefined) {
      request.drivingOptions = {};
      if (arg.trafficModel == 'live_trafic') {
        request.drivingOptions.trafficModel = 'optimistic';
      }
      request.drivingOptions.departureTime = new Date(arg.departure_time);
    }

    if (arg.unit != undefined) {
      request.unitSystem = (arg.unit == 'mi') ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
    }

    if (arg.language != undefined) {
      request.language = arg.language;
    }
    _service.getDistanceMatrix(
      request,
      function (response, status) {
        if (status === 'OK') {
          if (arg.callback != undefined && typeof arg.callback == 'function') {
            arg.callback.call(null, response);
          }

        } else {
          if (arg.callback != undefined && typeof arg.callback == 'function') {
            arg.callback.call(null, response);
          }
        }
      });
  }

  function _trafficLayer(dataval) {
    if (dataval == 'off') {
      trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(_map);
    } else {
      trafficLayer.setMap(null);
    }
  }

  function _panBy(x, y) {
    _map.panBy(x, y);
  }

  function _markersByTopicsId() {
    var topicsId = options.clusterSetting.topicsId.split(",");
    _markers.topic_cluster = [];
    var newMarker = [..._markers[2]];
    var topicMarker = [];
    topicsId.forEach((v) => {
      if (!newMarker) {
        return false;
      }
      topicMarker[v] = newMarker.filter((el) => (el && el.storeDetails.topics == v));
    })
    topicMarker['no_topic'] = newMarker.filter((el) => (el && el.storeDetails.topics == ""));
    _markers.topic_cluster = topicMarker;
  }

  function _clusterTopicImage(id) {
    var clusterStyles = [{
        height: 40,
        url: options.clusterSetting.image_json['clustertopic' + id + '_1'],
        width: 40,
        textColor: options.clusterSetting.cluster_font_color
      },
      {
        height: 54,
        url: options.clusterSetting.image_json['clustertopic' + id + '_2'],
        width: 54,
        textColor: options.clusterSetting.cluster_font_color
      },
      {
        height: 68,
        url: options.clusterSetting.image_json['clustertopic' + id + '_3'],
        width: 68,
        textColor: options.clusterSetting.cluster_font_color
      },
    ];
    var cluster = {
      styles: clusterStyles
    };
    return cluster;
  }
  //-----------------------Public Function----------------------------


  /* to get the map object */
  this.getMap = function () {
    return _map;
  }

  /* to initiate the map if not set to default */
  this.initMap = function () {
    _Init(_options);
  }

  /* to set the map options like center , zoom etc*/
  this.setOptions = function (option) {
    _map.setOptions(option);
  }

  /*Set autocomplete options*/
  this.setAutocomplete = function (options) {
    _AutoComplete(options);
  }

  /* to create the markers on map*/
  this.createMarker = function (data) {

    var marker = '';
    //console.log(data);
    /* check the index for the markers */
    var i = arguments[1] || 0;

    /* make 2 dimensional array for different layers for mulitple markers */
    if (typeof (_markers[i]) == 'undefined') {
      _markers[i] = [];
    }

    /* if data is array for multiple markers */
    if (data.length == undefined) {

      /* create single marker */
      marker = _createSingleMarker(data);

      /* save it in array */
      _markers[i].push(marker);
    } else {
      /* create multiple markers */
      for (var j = 0; j < data.length; j++) {
        if (data[j] != undefined) {
          var m = _createSingleMarker(data[j]);
          _markers[i].push(m);
        }
      }
    }
    return marker;
  }

  /* remove all markers from a given index */
  this.clearAllMarkers = function (index, mc) {
    _clearMarkers(index, mc);
  }

  this.clearMarkersBykey = function (key, value, index) {
    var markers;
    if (_markers[index] == undefined) {
      return;
    }
    var len = _markers[index].length;
    for (var i = 0; i < len; i++) {
      if (_markers[index][i][key] == value) {
        markers = _markers[index][i];
        if (markers != '' && markers != undefined) {
          markers.setMap(null);
        }
        _markers[index][i] = '';
      }
    }
  }

  /* get markers for a given index */
  this.getMarkers = function (index) {
    return _markers[index];
  }

  /* create polyline */
  this.createPolyline = function (data, i) {
    var poly = _createPolyline(data);
    _polylines[i].push(poly);
    return poly;
  }

  /* remove all polylines from a given index */
  this.clearAllPolylines = function (index) {
    _clearPolylines(index);
  }

  /* get the map bounds */
  this.GetBounds = function () {
    return _bounds;
  }
  this.GetMapBounds = function () {
    return _map.getBounds();
  }

  /* Set map bounds to show markers from a given index */
  this.SetMarkersBounds = function (index) {
    if (_markers[index].length > 0) {
      _bounds = null;
      _bounds = new google.maps.LatLngBounds();
      // console.log(_markers[index]);
      for (var j = 0; j < _markers[index].length; j++) {
        if (_markers[index][j] && typeof _markers[index][j].getPosition() == 'object') {
          _bounds.extend(_markers[index][j].getPosition());
        }
      }
      if (index == 4) {
        _bounds.extend(_markers[3][0].getPosition())
      }
      _map.fitBounds(_bounds);
    }
  }

  /* set map bounds to show polylines for a given index */
  this.setpolylineBounds = function (i, index) {
    if (_polylines[index].length > 0) {
      _bounds = null;
      _bounds = new google.maps.LatLngBounds();
      var points = _polylines[index][i].getPath().getArray();

      for (var j = 0; j < points.length; j++)
        _bounds.extend(points[j]);
      _map.fitBounds(_bounds);
    }
  }

  /* get the geolocation */
  this.GetGeoLocation = function (options) {
    _Geolocation(options);
  }

  this.getMarkersBykey = function (key, value, index) {
    var markers;
    if (_markers[index] == undefined) {
      return;
    }

    var len = _markers[index].length;
    for (var i = 0; i < len; i++) {
      if (_markers[index][i][key] == value) {
        markers = _markers[index][i];
        break;
      }

    }
    return markers;
  }
  this.clickMarkersBykey = function (key, value, index) {
    var marker;
    var len = _markers[index].length;
    for (var i = 0; i < len; i++) {
      if (_markers[index][i][key] == value) {
        marker = _markers[index][i];
        break;
      }
    }
    new google.maps.event.trigger(marker, 'click');
  }

  /*get Street view*/
  this.GetStreetView = function (latlng, radius, divname) {
    _GetStreetView(latlng, radius, divname);
  }

  this.FilterMarkers = function (allPoints, type, val, mc, index) {
    var temp = allPoints;
    var len = temp.length;

    if (typeof (_markers[index]) != 'undefined') {
      _clearMarkers(index, 1);
    } else {
      _markers[index] = [];
      for (var i = 0; i < len; i++) {
        if (typeof (temp[i]) != 'undefined') {
          if (temp[i][type] == val) {
            var m = _createSingleMarker(temp[i]);
            _markers[index].push(m);
          }
        }
      }
    }

  }

  this.setCustombounds = function (arr) {
    if (arr.length > 0) {
      _bounds = null;
      _bounds = new google.maps.LatLngBounds();

      for (var j = 0; j < arr.length; j++) {
        if (arr[j]) {
          _bounds.extend(arr[j].getPosition());
        }
      }
      _map.fitBounds(_bounds);

      /*set zoom if zoom level is more then 8*/
      if (_map.getZoom() > 8) {
        _map.setZoom(_map.getZoom() - 1);
      }

    }
  }

  /*resize map*/
  this.mapResize = function () {
    google.maps.event.trigger(_map, 'resize');
  }

  /*function for set center of map with marker*/
  this.panTo = function (latLng) {
    _map.panTo(latLng);
  }
  /*function for set center of map*/
  this.getCenter = function () {
    return _map.getCenter();
  }

  /*function for get zoom of map*/
  this.getZoom = function () {
    return _map.getZoom();
  }

  /*Function for manage traffic layer*/
  this.trafficLayer = function (dataval) {
    _trafficLayer(dataval);
  }

  /*Function for chagne offset of map center*/
  this.panby = function (x, y) {
    _panBy(x, y);
  }

  this.setMarkerCluster = function (index, mcOptions) {
    if (options.clusterSetting.clusteByTopic) {
      _markersByTopicsId();
      if (!_markers.topic_cluster) return false;
      _markers.topic_cluster.forEach((markerObj, objKey) => {
        mcOptionsTopic = _clusterTopicImage(objKey);
        if (typeof (_markers.topic_cluster[objKey]) != 'undefined' && _markers.topic_cluster[objKey] && _markers.topic_cluster[objKey].length > 0) {
          _markerClusters[objKey] = new MarkerClusterer(_map, _markers.topic_cluster[objKey], mcOptionsTopic);
        }
      })
      if (typeof (_markers.topic_cluster['no_topic']) != 'undefined' && _markers.topic_cluster['no_topic'].length > 0) {
        _markerClusters[index] = new MarkerClusterer(_map, _markers.topic_cluster['no_topic'], mcOptions);
      }
    } else {
      if (typeof (_markers[index]) != 'undefined') {
        _markerClusters[index] = new MarkerClusterer(_map, _markers[index], mcOptions);
      }
    }

  }
  this.showHideSearchButton = function () {
    var x = document.getElementById("oc-show-more-button");
    if (x != null && x.style.display === "block") {
      x.style.display = "none";
    }
  }
  this.isMarkerWithInBounds = function (marker) {
    var bounds = _map.getBounds();
    return bounds.contains(marker);
  }
  /*Function for geocode*/
  this.getGeoCode = function (arg) {
    return _getGeoCode(arg);
  }
  /*Function for direction api*/
  this.getRoute = function (arg) {
    return _getDirection(arg);
  }
  /*Function for Distance Matrix api*/
  this.getDistance = function (arg) {
    return _getDistanceMatrix(arg);
  }

} /*end GetMap*/
