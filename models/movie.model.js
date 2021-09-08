'use strict';

class Moovies {
  constructor(title, overview, vote, count, img, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.vote = vote;
    this.count = count;
    this.img = img;
    this.popularity = popularity;
    this.release_date = release_date;
  }
}

module.exports = Moovies;
