/*
for a given set of four points, does the defined bounding box straddle the 180th meridian?
it is ambiguous, unless points are ordered.
so we will assume the points go [top left, top right, bottom left, bottom right]
this whole module will parseFloat soon as it takes it in
*/

function doBoundsWrap(bounds){
    // if top-left is east of top-right
    // if bounds[0] has x property > of bounds[1] x property
    // lat,long is y,x, so bounds[0][1] is top-left.x and bounds[1][1] is top-right.x
    return bounds[0][1] > bounds[1][1];
}

function splitBoundsOnMeridian(bounds){
    // already established that bounds wraps the 180th meridian
    // create two new arrays to return
    let westernBound = [];
    let easternBound = [];

    //first add the western bound's top-left lat,long
    //this will have a matching latitude to other top points, and -180 degree longitude
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

// bounds is taken in as [["lat","long"],[...]]
// point is taken in as ["lat","long"]
function isPointWithinBoundingBox(bounds, point){
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
