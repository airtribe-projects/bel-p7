const express = require('express');
const app = express();
app.use(express.json());

function middle1(req, res, next) {
    console.log("First middelware");
    next()
}

function middle2(req, res, next) {
    console.log("second middelware");
    next();
}



app.get('/', middle1, function(req, res) {
    console.log("Processing the request");
    res.status(200).send("hello world hello");
})

app.get('/hello', middle2, function(req, res) {
    console.log("Processing the request");
    res.status(200).send("hello world hello");
});

app.listen(3000, () => {
    console.log("server has started");
});