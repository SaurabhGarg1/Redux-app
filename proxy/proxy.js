const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const mockDatas = require('./mockdata.json');

const app = express();
const PORT = 3002;
const HOST = "localhost";

app.use('/getCustomerData', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(mockDatas).status(200)
})


app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});