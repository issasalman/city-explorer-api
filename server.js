'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.get('/', function (request, response) {
  response.send(
    'Hello 301👋 In this API u can know the weather of any location You want Like :Amman And Seattle Also we can provide for you a movie related to location name  '
  );
});

const getWeather = require('./controller/weather.controller');

const getMovie = require('./controller/movie.controller');

app.get('/weather', getWeather);
app.get('/movies', getMovie);

let port = process.env.PORT || 3020;
app.listen(port, () => {});
