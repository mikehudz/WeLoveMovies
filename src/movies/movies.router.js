const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list) //returns a list of movies
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)   //returns a specific movie by its Id
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.readTheatersByMovieId)   //returns a list of theaters where a specific movie is showing
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.readReviewsByMovieId)     //returns a list of reviews for a specific movie
    .all(methodNotAllowed);

module.exports = router;