"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());

// const weather = require("./data/weather.json");

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
   
  }
}


class Moovies {
  constructor(title, overview, vote, count, img,popularity,release_date) {
    this.title = title;
    this.overview = overview;
    this.vote = vote;
    this.count = count;
    this.img = img;
    this.popularity=popularity;
    this.release_date=release_date;
  }
}

app.get("/", function (request, response) {
  response.send(
    "Hello 301👋 In this API u can know the weather of any location You want Like :Amman And Seattle Also we can provide for you a movie related to location name  "
  );
});

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (request, response) => {
  // const lon = request.query.lon;
  const city_name = request.query.city;
  // const lat = request.query.lat;
  // console.log(lat);
  // console.log(city_name);
  const weatherBitUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
  const weatherBitResponse = await axios.get(
    `${weatherBitUrl}?city=${city_name}&key=${WEATHER_API_KEY}`
  );

  // console.log("hello",WEATHER_API_KEY);
  // console.log(movieResponse);

  if (city_name) {
    // const returnArray = movieResponse.data.data.find((item) => {
    //   console.log(item);
    //   return item.city_name.toLowerCase() === city_name;
    // });
    // // console.log(returnArray);
    let arr1 = weatherBitResponse.data.data.map((data1) => {
      // console.log(data1);
      return new Forecast(
        ` Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
        ` ${data1.datetime}`
      );
    });

    if (arr1.length) {
      response.json(arr1);
      console.log(arr1);
    } else {
      response.send("error: Something went wrong.");
    }
  } else {
    response.json("error: Something went wrong.");
  }
});

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

app.get("/movies", async (request, response) => {
  // const lon = request.query.lon;
  const city_name = request.query.query;

  // const lat = request.query.lat;
  // console.log(lat);
  // console.log(city_name);
  const movie = "https://api.themoviedb.org/3/search/movie";
  const movieResponse = await axios.get(
    `${movie}?query=${city_name}&api_key=${MOVIES_API_KEY}`
  );

  // console.log("hello",WEATHER_API_KEY);

  // response.json("error: Something went wrong.");
  if (city_name) {
    // const returnArray = movieResponse.data.data.find((item) => {
    //   console.log(item);
    //   return item.city_name.toLowerCase() === city_name;
    // });
    // // console.log(returnArray);
    let arr1 = movieResponse.data.results.map((data1) => {
      console.log(data1);
      return new Moovies(
        `Title: ${data1.title}`,
        `Overview: ${data1.overview}`,
        `Average votes: ${data1.vote_average}`,
        ` Total Votes: ${data1.vote_count}`,
        `${data1.poster_path}`,
        `popularity:${data1.popularity}`,
        `release_date:${data1.release_date}`

      );
    });

    if (arr1.length) {
      response.json(arr1);
    } else {
      response.send("error: Something went wrong.");
    }
  } else {
    response.json("error: Something went wrong.");
  }
});

let port = process.env.PORT || 3020;
app.listen(port, () => {});
