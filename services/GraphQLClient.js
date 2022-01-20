const {GraphQLClient} = require("graphql-request");

module.exports = new GraphQLClient("https://api.chargetrip.io/graphql", {
    headers: {
        "Content-Type" : "application/json",
        "x-client-id": "61e93c454291a184d6120435"
    }
})
