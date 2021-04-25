var express = require('express');
var router = express.Router();

var getGeoIpData = require('../models/geoip');

router.get('/', async (req, res, next) => {
    let geoIpData = await getGeoIpData;
    res.send(geoIpData);
    
});

router.get('/boundingBox', async (req,res,next) => {
  let geoIpData = await getGeoIpData;
    let points = [];
    req.query.bounds.forEach((bound) => {
      let lat, long = bound.split(",");
      points.push({lat,long});
    })
    res.send(geoIpData.filter((geoIp) => {

    }));
});

module.exports = router;
