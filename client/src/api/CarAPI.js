import axios from "axios";

const API_URL = "http://localhost:8000";

export default class CarAPI{

    static listCars(){
        return new Promise(((resolve, reject) => {
            axios.get(API_URL + "/cars").then(r => {
                resolve(r.data);
            }).catch(e => reject(e));
        }))
    }

}
