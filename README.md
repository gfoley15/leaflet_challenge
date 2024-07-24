# leaflet_challenge

## Overview
The United States Geological Survey (USGS) collects and analyzes vast amounts of earthquake data worldwide daily. This project aims to visualize this data using Leaflet to create an interactive map that displays earthquake locations, magnitudes, and depths.

## Summary
- Create the Earthquake Visualization
- Use Leaflet to plot earthquake data based on longitude and latitude.
- Markers reflect earthquake magnitude (size) and depth (color intensity).
- Popups should provide additional earthquake information upon marker click.
- Create a legend to contextualize the map data.

## Implementation
#### Map Visualization
- Implement Leaflet's TileLayer for map rendering.
- Connect to USGS GeoJSON API using D3.js to fetch earthquake data.
#### Marker Representation
 - Size of markers corresponds to earthquake magnitude.
 - Color intensity of markers reflects earthquake depth.
#### Popups and Legend
 - Each marker popup displays magnitude, location, and depth.
 - Legend shows depth range and corresponding color gradient.

## Files
- index.html: Main HTML file for displaying the Leaflet map.
- style.css: CSS file for custom styling of the map and legend.
- app.js: JavaScript file containing the Leaflet and D3 code for data visualization.

## Credits
- Data provided by USGS Earthquake Hazards Program.
- Built using Leaflet, D3.js, and related libraries.
