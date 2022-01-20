const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()
const port = 8000

app.use(cors());
app.use(bodyParser.json({limit: '1024kb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("API")
})

require('./routes')(app);

app.listen(port, () => {
    console.log(`Car listening at http://localhost:${port}`)
})
