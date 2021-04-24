var csv = require('csv-parser');
var fs = require('fs');

var getGeoIpData = new Promise((resolve, reject) => {
    let data = [];
    fs.createReadStream('GeoLite2-City-Blocks-IPv4.csv')
        .pipe(csv())
        .on('data', (row) => {
            data.push({"latitude": row.latitude, "longitude": row.longitude});
        })
        .on('end', () => {
            console.log("loaded CSV");
            resolve(data);
        });
})

module.exports = getGeoIpData;
