var csv = require('csv-parser');
var fs = require('fs');

var getGeoIpData = new Promise((resolve, reject) => {
    // this is a poor replacement for a database
    // but at least I like that it is queried asynchronously
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
