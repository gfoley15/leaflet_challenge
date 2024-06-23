// Store GEO JSON endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Run GET request to the queryURL
d3.json(queryUrl).then(function (data) {
  // Get a response, send data.features to the createFeatures function.
  console.log(data);
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function getMarkerStyle(feature) {
    console.log(feature.properties.mag)
    let magnitude = feature.properties.mag
    let radius = magnitude * 2
    let fillColor = chooseColor(magnitude);
    return {
      radius: radius,
      color: "grey",
      weight: 1,
      fillColor: fillColor,
      opacity: 1,
      fillOpacity: .8
    };
  };  

  function chooseColor(magnitude) {
    if (magnitude > 5.0) {
      return "purple";
    } else if (magnitude > 4) {
      return "orange";
    } else if (magnitude > 3) {
      return "yellow";
    } else if (magnitude > 2) {
      return "green";
    } else {
      return "blue";
    }
  };

  // For each feature, create popup that describes the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3>
            <hr><p>${new Date(feature.properties.time)}</p>
            <hr><p>${feature.properties.mag}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, getMarkerStyle(feature));
    },
      onEachFeature: onEachFeature
    });
  
    // Send earthquakes layer to the createMap function
    createMap(earthquakes);
    };
  
  function createMap(earthquakes) {
  
    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
 
    // Create map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
        center: [
            7.9, 14.4
          ],
          zoom: 2.4,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
};