var express = require('express');
var router = express.Router();

var getGeoIpData = require('../models/geoip');
var isPointWithinBoundingBox = require('../utilities/boundingBoxes');

let boundsAsFloats = (bounds) => bounds.map(bound => bound.map(parseFloat));
let pointAsFloats = (point) => [parseFloat(point[0]), parseFloat(point[1])];

router.get('/', async (req, res, next) => {
    let geoIpData = await getGeoIpData;
    res.send(geoIpData);
    
});

router.get('/boundingBox', async (req,res,next) => {
  let geoIpData = await getGeoIpData;
    let bounds = [];
    req.query.bounds.forEach((bound) => {
      bounds.push(bound.split(","));
    })
    let allPointsWithinBounds = geoIpData.filter(point => isPointWithinBoundingBox(boundsAsFloats(bounds), pointAsFloats(point)));
    res.send(allPointsWithinBounds);
});

module.exports = router;
