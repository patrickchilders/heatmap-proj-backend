function doBoundsWrap(bounds){
    // do the provided set of bounding box coordinates wrap the 180th meridian?
    return bounds[0][1] > bounds[1][1];
}

function splitBoundsOnMeridian(bounds){
    // use the 180th meridian to cut the bounding box in two
    // allowing logic for a bounding box to always assume a bounding box does not cross the 180th meridian
    let westernBound = [];
    let easternBound = [];

    westernBound.push([bounds[0][0],-180]);
    westernBound.push(bounds[1]);
    westernBound.push([bounds[2][0],-180]);
    westernBound.push(bounds[3]);

    easternBound.push(bounds[0]);
    easternBound.push([bounds[1][0], 180]);
    easternBound.push(bounds[2]);
    easternBound.push([bounds[3][0], 180]);

    return {"westernBound": westernBound, 
            "easternBound": easternBound};
}

function isPointWithinBoundingBox(bounds, point){
    // if the bounding box wrap the 180th meridian, split it in two and re-call this function on each half
    if(doBoundsWrap(bounds)){
        let {easternBound, westernBound} = splitBoundsOnMeridian(bounds);
        return isPointWithinBoundingBox(easternBound, point) || isPointWithinBoundingBox(westernBound, point);
    } else {
        let northernmostLatitude = bounds[0][0];
        let southernmostLatitude = bounds[3][0];
        let westernmostLongitude = bounds[0][1];
        let easternmostLongitude = bounds[3][1];
        let [pointLatitude, pointLongitude] = point;
        return pointLatitude <= northernmostLatitude &&     // south of northernmost
                pointLatitude >= southernmostLatitude &&    // north of southernmost
                pointLongitude <= easternmostLongitude &&   // west of easternmost
                pointLongitude >= westernmostLongitude;     // east of westernmost
    }
}

module.exports = isPointWithinBoundingBox;
