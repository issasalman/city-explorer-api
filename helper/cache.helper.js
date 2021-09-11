"use strict";

class Cache {
  constructor() {
    this.forCast = [];
    this.movies = [];
    this.timeStamp = Date.now();
  }
}

module.exports = Cache;
