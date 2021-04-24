var express = require('express');
var router = express.Router();

var geoIpData = [];

var getGeoIpData = require('../models/geoip').then((data) => {
    geoIpData = data;
});

router.get('/', function(req, res, next) {
    if(geoIpData.length == 0){
      res.send("loading");
    } else {
      res.send(geoIpData);
    }
});

router.get('/boundingBox', function(req,res,next) {
  res.send(req.query.bounds);
});

module.exports = router;
