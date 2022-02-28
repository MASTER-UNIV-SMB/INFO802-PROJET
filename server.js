const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const CarsServiceSOAP = require("./services/CarsServiceSOAP");
const soap = require("express-soap").soap;

const app = express()
const server = require('http').createServer(app);
const port = 8000

app.use(cors());
app.use(bodyParser.json({limit: '1024kb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("API")
})

require('./routes')(app);

const xml = require('fs').readFileSync('./carservice.wsdl', 'utf8');
app.use('/soap', soap({
    services: {
        CarsService: CarsServiceSOAP
    },
    wsdl: xml,
}));

server.listen(port, () => {
    console.log(`Car listening at http://localhost:${port}`)
})
