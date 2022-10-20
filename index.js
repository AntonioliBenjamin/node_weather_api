require('dotenv').config();
const apiKey = process.env.API_KEY;
const port = Number(process.env.PORT);
const axios = require('axios');
const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    return res.status(200).send('ok')
})

app.get('/weather/:city?', async (req, res) => {
try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${req.params.city}&aqi=no`);
    return res.send({ 
            "temp_in_celsius": response.data.current.temp_c
    })
} catch {
    return res.status(404).send({
            message: 'Ville introuvable'
        })
    }
})

function getRandomIndex(max) {
    return Math.floor(Math.random() * max -1)
}

app.get('/quoteday', async (req, res) => {
    const response = await axios.get('https://zenquotes.io/api/quotes')
    return res.send({
        "quoteday": response.data.map(item  => item.q)[getRandomIndex(response.data.length)]
    })
})

app.listen(port, () => {
  console.log(`app listening on secret port`)
})