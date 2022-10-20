require('dotenv').config();
const apiKey = process.env.API_KEY;
const axios = require('axios');
const express = require('express');
const app = express();
const port = Number(process.env.PORT);

app.get('/status', async (req, res) => {
    res.status(200).send('ok')
})

app.get('/weather', async (req, res) => {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Paris&aqi=no`);
    res.send({ 
            "temp_in_celsius": response.data.current.temp_c
    });    
})

app.listen(port, () => {
  console.log(`app listening on secret port`)
})

