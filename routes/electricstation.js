const vector = require('../data/bornes-irve.json');
const geolib = require('geolib');

module.exports = function (app) {

    app.post('/electric-station', function (req, res) {
        let steps = req.body.steps;
        let autonomy = parseInt(req.body.autonomy) * 1000;
        let km = parseInt(req.body.km) * 1000;

        console.log()

        if(km < autonomy){
            return res.json({
                "stations": []
            })
        }

        let stations = [];
        let distance = 0;
        let autonomy_left = autonomy;

        steps.map(s => {
            let intersection = s.intersections[0];
            let distanceIntersection = s.distance;

            console.log(distance + distanceIntersection, autonomy_left)
            if(distance + distanceIntersection >= autonomy_left){
                let station = nearest_feature(intersection.location[1], intersection.location[0]);
                stations.push(station);

                autonomy_left = autonomy;
                distance = 0;
                console.log("Ajout de la station : " + station.fields.region)
            }else{
                distance += distanceIntersection;
                autonomy_left -= distanceIntersection;
            }
        });

        console.log("Distance totale : " + distance)

        return res.json({
            "stations": stations
        })
    });

}

function nearest_feature(lat, lon) {
    let features = vector;

    let closest = features[0];
    let closestDistance = 99999999999999999;

    features.map(c => {
        if(c.fields){
            if(c.fields.geo_point_borne){
                let distance = geolib.getDistance(
                    {  lat, lon },
                    { latitude: c.fields.geo_point_borne[0], longitude: c.fields.geo_point_borne[1] }
                );
                if(distance <= closestDistance){
                    if(c.fields.region){
                        closest = c;
                        closestDistance = distance;
                    }
                }
            }
        }
    });

    return closest;
}
