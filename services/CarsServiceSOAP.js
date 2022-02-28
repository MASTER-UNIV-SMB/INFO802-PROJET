const CarServiceGraphQL = require("../services/CarServiceGraphQL");

const Services = {
    CarsService: {
        List: function({page}, res) {
            return CarServiceGraphQL().then(r => {
                return res({body: JSON.stringify(r)});
            }).catch(e => {
                return res({body: JSON.stringify([])});
            })
        },
    }
};

module.exports = Services;
