import axios from "axios";

const API_URL = "http://localhost:8000";

export default class WayAPI{

    static listWaypoints(steps, autonomy, km){
        return new Promise(((resolve, reject) => {
            axios.post(API_URL + "/electric-station", {
                steps, autonomy, km
            }).then(r => {
                resolve(r.data);
            }).catch(e => reject(e));
        }))
    }

}
