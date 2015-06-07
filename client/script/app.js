(function () {

  var map = L.map('map').setView([32.227384, -110.933243], 11);

  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
      subdomains: '1234',
      attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">'
        + 'MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetm'
        + 'ap.org">OpenStreetMap</a> contributors, <a href="http://creative'
        + 'commons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      detectRetina: true
  }).addTo(map);

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var options = {
      position: 'topleft',
      draw: {
          polyline: {
            shapeOptions: {
              color: '#f357a1',
              weight: 10
            }
          },
          marker: false,
          polygon: false,
          rectangle: false,
          circle: false
      },
      edit: {
          featureGroup: drawnItems,
          remove: true
      }
  };

  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  map.on('draw:created', function (event) {
//    var geometry = JSON.stringify(event.layer.toGeoJSON());
    $('#myModal').modal('show');
    $('#geometry').val(JSON.stringify(event.layer.toGeoJSON()));
    drawnItems.addLayer(event.layer)
    $('form').submit(function (event) {
      event.preventDefault();
      var data = $('form').serializeArray();
      $.post('/trails/', data, function () {
        $('#myModal').modal('hide');
      })
    });
  });

  $.get('/trails/', function (data) {
    for (var i=0; i<data.length; i++) {
      var layer = L.geoJson(data[i].geometry);
      map.addLayer(layer);
    }
  });

  var gpsControl = L.Control.extend({
    options: 'topleft',
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'custom-control');
      return container;
    }
  });

  map.addControl(new gpsControl());

  $(".custom-control").click(function () {
    if ("geolocation" in navigator) {

      var geometry = {
        type: "Feature",
        properties: { },
        geometry: {
          type: "LineString",
          coordinates: []
        }
      };

      function success (pos) {
        var newPos = [pos.coords.longitude, pos.coords.latitude];
        geometry.geometry.coordinates.push(newPos);
        console.log(geometry);
        var latlng = L.latLng(pos.coords.latitude, pos.coords.longitude)

        var lineLayer = L.geoJson(geometry, {
          color: '#ff7800',
          weight: 5,
          opacity: 0.65
        });

        map.removeLayer(lineLayer);
        map.addLayer(lineLayer);

        map.setView(latlng, 17);
        console.log(pos.coords.latitude, pos.coords.longitude);
      }

      function error (error) {
        console.log(error);
      }

      var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.watchPosition(success, error, options);

    }

  });

})(this);