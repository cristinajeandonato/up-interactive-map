var customIcons = {
  building: {
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
  },
  housing: {
    icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
  },
  parking: {
    icon: 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
  },
  library: {
    icon: 'http://maps.google.com/mapfiles/ms/icons/purple.png'
  },
  recreation: {
    icon: 'http://maps.google.com/mapfiles/ms/icons/orange.png'
  },
};

var allMarkers = [];
var markerCategories = {};

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(10.322727, 123.898623),
    zoom: 18,
    mapTypeId: 'roadmap'
  });
  var infoWindow = new google.maps.InfoWindow();

  downloadUrl("markersSqlToXml.php", function (data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
      var name = markers[i].getAttribute("name");
      var address = markers[i].getAttribute("address");
      var type = markers[i].getAttribute("type");
      var point = new google.maps.LatLng(
      parseFloat(markers[i].getAttribute("lat")),
      parseFloat(markers[i].getAttribute("lng")));

      var infowincontent = document.createElement('div');
      var strong = document.createElement('strong');
      strong.textContent = name
      infowincontent.appendChild(strong);
      infowincontent.appendChild(document.createElement('br'));

      var text = document.createElement('text');
      text.textContent = address
      infowincontent.appendChild(text);

      var html = "<b>" + name + "</b> <br/>" + address;
      //var icon = customIcons[type] || {};
      var marker = createMarker(point, name, address, type, map);
      bindInfoWindow(marker, map, infoWindow, html);
    }
  });
}

function createMarker(point, name, address, type, map) {
  var icon = customIcons[type] || {};
  var marker = new google.maps.Marker({
    map: map,
    position: point,
    icon: icon.icon,
    // shadow: icon.shadow,
    type: type
  });
  //create marker category if there is none
  if (!markerCategories[type]){
    markerCategories[type] = [];
  } 
  allMarkers.push(marker);
  markerCategories[type].push(marker);
  return marker;
}

function toggleGroup(type) {
  for (var i = 0; i < markerCategories[type].length; i++){
    var marker = markerCategories[type][i];
    if (!marker.getVisible()) {
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
  }
}

function bindInfoWindow(marker, map, infoWindow, html){
  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}

function hideMarkers(){
  for(var i = 0; i < allMarkers.length; i++){
    var marker = allMarkers[i];
    marker.setVisible(false);
  }
}

function showMarkers(){
  for(var i = 0; i < allMarkers.length; i++){
    var marker = allMarkers[i];
    marker.setVisible(true);
  }
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}
