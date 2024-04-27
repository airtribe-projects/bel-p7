const express = require('express');
const routes = require('express').Router();
const airQuality = require('../controllers/airQualityController');

const app = express();
app.use(routes);
app.use(express.json());



routes.use('/airQualities', airQuality);

const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send("helllo world");
});


app.listen(PORT, (err) => {
    if(err) {
        console.log('server has failed');
    } else {
        console.log('server has started');
    }
});
