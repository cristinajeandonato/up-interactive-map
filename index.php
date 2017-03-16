<!DOCTYPE html>
<html>
<head>
  <title>UP Cebu Interactive Map</title>
  <meta name="keywords" content="UP, UP Cebu, Interactive Map, Campus Map"/>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="icon" href="img/favicon/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="stylesheet" href="style.css">
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqADMedo8IANqA7GhkoMzQwexzoSK2quQ&callback=initMap"></script>
  <script src="map.js"></script>
</head>
<body>
  <div id="page">
    <header>
      <img id="logo" src="img/up-logo.png" alt="UP Logo"/>
      <h1>UP Cebu Interactive Map</h1>
    </header>
    <section id="map">

    </section>
    <section id="bot">
      <img id="bot-avatar" src="img/robot-avatar.svg"/>
      <div id="bot-response"></div>
      <form>
        <input type="text" name="userQuery"/>
      </form>
    </section>
    <nav>

    </nav>
    <!-- <input onclick="clearMarkers();" type=button value="Hide Markers"> -->
    <input type="checkbox" id="parkingCheckbox" onclick="toggleGroup('parking')" checked />parking
    <input type="checkbox" id="buildingCheckbox" onclick="toggleGroup('building')" checked />building
    <footer></footer>
  </div>
</body>
</html>
