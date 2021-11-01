const knex = require("../db/connection");

// returns a list of theaters and the movies showing at them
function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .distinct("t.*");
}

// returns a list of movies at a specified theater
function readMoviesByTheaterId(specifiedId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .distinct("m.*")
    .where({ "mt.theater_id": specifiedId });
}

module.exports = {
    list,
    readMoviesByTheaterId,
};