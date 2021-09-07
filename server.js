"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const weather = require("./data/weather.json");

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
    Forecast.all.push(this);
  }
}
Forecast.all = [];

app.get("/", function (request, response) {
  response.send("Hello 301👋 In this API u can know the weather of any location You want Like :Amman And Seattle  ");
});

// app.get("/weatherInfo", function (request, response) {
//   response.json(Forecast.all[0]);
// });

app.get("/weather", (request, response) => {

  
  const lon = request.query.lon;
  const city_name = request.query.city_name;
  const lat = request.query.lat;
  console.log(lat);
  console.log(city_name);
  console.log(lon);

  if (city_name) {
    const returnArray = weather.find((item) => {
      return item.city_name.toLowerCase() === city_name;
    });
    // console.log(returnArray);
    let arr1=returnArray.data.map((data1) => {
      // console.log(data1.weather.description);
      return new Forecast(
        ` Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
        ` ${data1.datetime}`
      );
    });

    // console.log(arr1);

    // console.log(Forecast);
    if (arr1.length) {
      response.json(arr1);
    } else {
      response.send("error: Something went wrong.");
    }
  } else {
    response.json(weather);
  }
});

let port = process.env.PORT || 3020;
app.listen(port, () => {});
