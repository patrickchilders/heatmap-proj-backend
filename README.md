# heatmap-proj-backend
Heatmap mini-portfolio project backend made with express.js

## Implemented Routes

### GET /geoip
Returns all latitude/longitude pairs in the data source CSV file.

### GET /geoip/boundingBox
Accepts a bounds[] denoting the four corners of the bounding box.
latitude/longitude pairs are only returned if they would be inside the bounding box.

## Implemented Tests

### load data
Tests that data is loaded from the CSV file

### /GET /geoip
Tests that the endpoint returns 200 OK
Tests that the endpoint returns an array

### /GET /geoip/boundingBox
Tests that the endpoint returns 200 OK
When provided bounding box coordinates that does not wrap the 180th meridian:
  Tests that the endpoint returns points inside the bounds
  Tests that the endpoint does not return points outside the bounds
Tests that the endpoint returns an array

### /GET /geoip/boundingBox
Tests that the endpoint returns 200 OK
When provided bounding box coordinates that wrap the 180th meridian:
  Tests that the endpoint returns points inside the bounds
  Tests that the endpoint does not return points outside the bounds
Tests that the endpoint returns an array

## Implemented Routes

### '/' (index)
Redirects to the only other route, '/geoip'

### '/geoip' (geoip)
Returns an array of latitude/longitude points, each being an array of 2 strings in format ['latitude','longitude']

### '/geoip/boundingBox' (geoip with bounding box)
Takes in an array of latitude/longitude points that define a bounding box
Returns all points inside that bounding box
Bounding Box coordinates must be specified in the following order:
  north-western-most point,
  north-eastern-most point,
  south-western-most point,
  south-eastern-most point
  


