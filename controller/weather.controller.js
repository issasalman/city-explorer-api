const axios = require("axios");
require("dotenv").config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require("../models/weather.model");
const Cache = require("../helper/cache.helper");
let cacheObject = new Cache();

const getWeather = async (request, response) => {
  const city_name = request.query.city;


  const shutTime = 60000;
  const oneMinute = (Date.now() - cacheObject.timeStamp) > shutTime;
  if (oneMinute) {
   
    cacheObject = new Cache();
  }


  const findData = cacheObject.forCast.find(
    (location) => location.city_name === city_name
  );
  if (findData) {
    response.json(findData.data);
  } else {
    const weatherBitUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
    const weatherBitResponse = await axios.get(
      `${weatherBitUrl}?city=${city_name}&key=${WEATHER_API_KEY}`
    );

    if (city_name) {
      let data = weatherBitResponse.data.data.map((data1) => {
        return new Forecast(
          ` Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
          ` ${data1.datetime}`
        );
      });

      cacheObject.forCast.push({
        city_name: city_name,
        data: data,
      });
      console.log(cacheObject);
      if (data.length) {
        response.json(data);
        console.log(data);
      } else {
        response.send("error: Something went wrong.");
      }
    } else {
      response.json("error: Something went wrong.");
    }
  }
};

module.exports = getWeather;
