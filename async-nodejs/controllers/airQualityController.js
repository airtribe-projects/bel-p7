const express = require('express');
const airQuality = require('express').Router();
const URLSearchParams = require('url-search-params');
const {airQualityCallback, airQualityPromise} = require('../helpers/airQuality');

airQuality.use(express.json());

let url = 'https://api.openaq.org/v2/latest';

airQuality.get('/callback', (req, res) => {
    airQualityCallback(url, (err, data) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            return res.status(200).send(data);
        }
    });
});

airQuality.get('/promise', (req, res) => {
    airQualityPromise(url).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return res.status(500).json({error: err});
    });
});

airQuality.get('/asyncAwait', async (req, res) => {
    try {
        let result = await airQualityPromise(url);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).json({error: err});
    }
});

airQuality.get('/callbackHell', (req, res) => {
    let payload = {page: 1};
    const searchParams = new URLSearchParams(payload);
    let total = [];
    airQualityCallback(`${url}?${searchParams}`, function(err, resp1) {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            payload.page = payload.page + 1;
            const searchParams2 = new URLSearchParams(payload);
            airQualityCallback(`${url}?${searchParams2}`, function(err2, resp2) {
                if(err2) {
                    return res.status(500).json({error: err2});
                } else {
                    payload.page = payload.page + 1;
                    const searchParams3 = new URLSearchParams(payload);
                    airQualityCallback(`${url}?${searchParams3}`, function(err3, resp3) {
                        if (err3) {
                            return res.status(500).json({error: err3});
                        } else {
                            total.push(resp1);
                            total.push(resp2);
                            total.push(resp3);
                            return res.status(200).send(total);
                        }
                    })
                }
            })

        }
    });
});

airQuality.get('/promises', (req, res) => {
    let payload = {page: 1};
    const searchParams = new URLSearchParams(payload);
    let total = [];
    airQualityPromise(`${url}?${searchParams}`).then(resp1 => {
        payload.page = payload.page + 1;
        const searchParams2 = new URLSearchParams(payload);
        airQualityPromise(`${url}?${searchParams2}`).then(resp2 => {
            payload.page = payload.page + 1;
            const searchParams3 = new URLSearchParams(payload);
            airQualityPromise(`${url}?${searchParams3}`).then(resp3=> {
                total.push(resp1);
                total.push(resp2);
                total.push(resp3);
                return res.status(200).send(total);
            }).catch(err3 => {
                return res.status(500).json({error: err3});
            })
        }).catch(err2 => {
            return res.status(500).json({error: err2});
        });
    }).catch(err1 => {
        return res.status(500).json({error: err1});
    })

});

airQuality.get('/v1/asyncAwaits', async (req, res)=> {
    try {
        let payload = {page: 1};
        const searchParams = new URLSearchParams(payload);
        let total = [];
        let resp1 = await airQualityPromise(`${url}?${searchParams}`);
        payload.page = payload.page + 1;
        const searchParams2 = new URLSearchParams(payload);
        let resp2 = await airQualityPromise(`${url}?${searchParams2}`);
        payload.page = payload.page + 1;
        const searchParams3 = new URLSearchParams(payload);
        let resp3 = await airQualityPromise(`${url}?${searchParams3}`);
        total.push(resp1);
        total.push(resp2);
        total.push(resp3);
        return res.status(200).send(total);
    } catch (err) {
        return res.status(500).json({error: err1});
    }

});

airQuality.get('/asyncAwaits ', (req, res ) => {
    let payload = {page: 1};
    const searchParams = new URLSearchParams(payload);
    payload.page = payload.page + 1;
    const searchParams2 = new URLSearchParams(payload);
    payload.page = payload.page + 1;
    const searchParams3 = new URLSearchParams(payload);
    let promise1 = airQualityPromise(`${url}?${searchParams}`);
    let promise2 = airQualityPromise(`${url}?${searchParams2}`);
    let promise3 = airQualityPromise(`${url}?${searchParams3}`);
    Promise.all([promise1, promise2, promise3]).then((values) => {
        return res.status(200).send(values);
    }).catch(err => {
        return res.status(500).json({error: err});
    })


});

module.exports = airQuality;
