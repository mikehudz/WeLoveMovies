const knex = require("../db/connection");

//returns a list of all movies
function list() {
    return knex("movies").select("*");
}

//returns a list of movies where movies-theaters.is_showing is true
function listIsShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({ "mt.is_showing": true });
}

//returns a specified movie by the movie_id
function read(specifiedId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: specifiedId });
}

//returns a list of theaters where a specified movie is showing
function readTheatersByMovieId(specifiedId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": specifiedId });
}

// returns a list of critics
function listCritics() {
    return knex("critics").select("*");
}

// returns a list of reviews for a specified movie_id
function readReviewsByMovieId(specifiedId) {
    return knex ("reviews as r")
        .join("movies as m", "r.movie_id", "m.movie_id")
        .select("r.*")
        .where({ "r.movie_id": specifiedId });
}

module.exports = {
    list,
    listIsShowing,
    read,
    readTheatersByMovieId,
    listCritics,
    readReviewsByMovieId,
};