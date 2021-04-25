var csv = require('csv-parser');
var fs = require('fs');

var getGeoIpData = new Promise((resolve, reject) => {
    let data = new Set();
    let excludedCount = 0;
    let includedCount = 0;
    fs.createReadStream('truncated_geoip_data.csv')
        .pipe(csv())
        .on('data', (row) => {
            if(!data.has(row.latitude+row.longitude)) {
                includedCount += 1;
                data.add(row.latitude+row.longitude);
            } else {
                excludedCount += 1;
            }
        })
        .on('end', () => {
            console.log(includedCount);
            console.log(excludedCount);
            console.log("loaded CSV");
            resolve(data);
        });
})

module.exports = getGeoIpData;
