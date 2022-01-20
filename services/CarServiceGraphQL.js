const GraphQLClient = require("./GraphQLClient");
const {gql} = require("graphql-request");

module.exports = function () {

    const query = gql`
                  {
                    carList(size:100, page:0) {
                        id
                        naming {
                          make
                          model
                          version
                          edition
                          chargetrip_version
                        }
                        adapters {
                          standard
                          power
                          time
                          speed
                        }
                        battery {
                          usable_kwh
                          full_kwh
                        }
                        range {
                          chargetrip_range {
                            best
                            worst
                          }
                        }
                        media {
                          image {
                            id
                            type
                            url
                            height
                            width
                            thumbnail_url
                            thumbnail_height
                            thumbnail_width
                          }
                        }
                        routing {
                          fast_charging_support
                        }
                      }
                  }
                `

    return new Promise(((resolve, reject) => {
        GraphQLClient.request(query).then((data) => resolve(data)).catch(e => reject(e));
    }))
}
