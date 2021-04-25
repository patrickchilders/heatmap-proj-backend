var csv = require('csv-parser');
var fs = require('fs');

var getGeoIpData = new Promise((resolve, reject) => {
    let data = [];
    fs.createReadStream('truncated_geoip_data.csv')
        .pipe(csv())
        .on('data', (row) => {
             data.push([row.latitude, row.longitude]);
        })
        .on('end', () => {
            console.log("data loaded");
            resolve(data);
        });
})

module.exports = getGeoIpData;
