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
  response.send("Hello 301  👋");
});

app.get("/weatherInfo", function (request, response) {
  response.json(Forecast.all[0]);
});

app.get("/weather", (request, response) => {
  const lon = request.query.lon;
  const city_name = request.query.city_name;
  const lat = request.query.lat;
  console.log(lat);
  console.log(city_name);
  console.log(lon);

  if (city_name) {
    const returnArray = weather.filter((item) => {
      return item.city_name.toLowerCase() === city_name;
    });
    // console.log(returnArray[0].data);
    returnArray[0].data.find((data1) => {
      console.log(data1.weather.description);
      new Forecast(
        ` Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
        ` ${data1.datetime}`
      );
    });

    console.log(Forecast.all[0]);
    // console.log(Forecast);
    if (returnArray.length) {
      response.json(returnArray);
    } else {
      response.send("error: Something went wrong.");
    }
  } else {
    response.send("404 error page not found  ");
  }
});

let port = process.env.PORT || 3020;
app.listen(port, () => {});
