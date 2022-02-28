import axios from "axios";
import soapRequest from "easy-soap-request/index.d";
const XMLParser = require('react-xml-parser');

const API_URL = "http://localhost:8000";

let SOAP = '<?xml version="1.0" encoding="UTF-8"?> <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://Example.org"><soapenv:Header /><soapenv:Body><exam:List><exam:page>1</exam:page></exam:List></soapenv:Body></soapenv:Envelope>';

export default class CarAPI{

    static listCars(){
        return new Promise(((resolve, reject) => {
            axios.get(API_URL + "/cars").then(r => {
                resolve(r.data);
            }).catch(e => reject(e));
        }))
    }

    static async listCarsSOAP() {
        const {response} = await soapRequest({url: API_URL + "/soap", headers: {
                'Content-Type': 'text/xml;charset=UTF-8'
            }, xml: SOAP});
        const {headers, body, statusCode} = response;

        var xml = new XMLParser().parseFromString(body);

        var doc = new DOMParser().parseFromString(xml.children[0].children[0].children[0].value, "text/html");
        let carslist = JSON.parse(doc.documentElement.textContent);

        return carslist;
    }

}
