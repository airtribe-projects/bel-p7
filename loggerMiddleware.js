const express = require('express');
const app = express();

function logger(req, res, next) {
    console.log('Request received: ', req.method, req.url);
    next();
}

app.use(logger);

app.get('/', function(req, res) {
    console.log("Processing the request");
    res.status(200).send("hello world hello");
})

app.get('/hello', function(req, res) {
    console.log("Processing the request");
    res.status(200).send("hello world hello");
})

app.listen(3000, () => {
    console.log("server has started");
});