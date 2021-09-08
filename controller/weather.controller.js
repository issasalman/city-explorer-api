const axios = require('axios');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../models/weather.model');

const getWeather = async (request, response) => {
  // const lon = request.query.lon;
  const city_name = request.query.city;
  // const lat = request.query.lat;
  // console.log(lat);
  // console.log(city_name);
  const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const weatherBitResponse = await axios.get(
    `${weatherBitUrl}?city=${city_name}&key=${WEATHER_API_KEY}`
  );

  if (city_name) {
    let arr1 = weatherBitResponse.data.data.map((data1) => {
      return new Forecast(
        ` Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
        ` ${data1.datetime}`
      );
    });

    if (arr1.length) {
      response.json(arr1);
      console.log(arr1);
    } else {
      response.send('error: Something went wrong.');
    }
  } else {
    response.json('error: Something went wrong.');
  }
};

module.exports = getWeather;
