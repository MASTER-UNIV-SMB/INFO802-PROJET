const CarServiceGraphQL = require("../services/CarServiceGraphQL");

module.exports = function(app){

    app.get('/cars', function(req, res){
        CarServiceGraphQL().then(r => {
            res.json(r);
        }).catch(e => {
            res.json(e);
        })
    });

}
