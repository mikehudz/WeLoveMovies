const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// If movieId exists, store movie in res.locals.movie
// If not, return 404 "Movie cannot be found"
async function checkIfMovieExists(req, res, next) {
    const movieId = await service.read(req.params.movieId);
    const movie = movieId[0];
    if (movie) {
    res.locals.movie = movie;
    return next();
    }
    next({ status: 404, message: "Movie cannot be found." });
}

//returns a list of movies
async function list(req, res) {
    const isShowing = req.query.is_showing;
    const data = isShowing ? await service.listIsShowing() : await service.list();
    res.json({ data });
}

// returns a specified movie by the movie_id
function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data: data });
}

// return a list of theaters where the specified movie is showing
async function readTheatersByMovieId(req, res) {
    const movieId = req.params.movieId;
    const theatersData = await service.readTheatersByMovieId(movieId);
    const now = new Date().toISOString();
    const timestamp = { created_at: now, updated_at: now };
    const data = theatersData.map((theater) => {
      return { ...theater, ...timestamp };
    });

    res.json({ data });
}

// return a list of reviews for a specified movie_id
async function readReviewsByMovieId(req, res) {
    const movieId = req.params.movieId;
    const reviewsData = await service.readReviewsByMovieId(movieId);
    const critics = await service.listCritics();
    const now = new Date().toString();
    const timestamp = { created_at: now, updated_at: now };
    const data = reviewsData.map((review) => {
      const foundCritic = {
        critic: critics.find((critic) => critic.critic_id === review.critic_id),
      };
        return { ...review, ...timestamp, ...foundCritic };
    });

    res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(checkIfMovieExists), read],
  readTheatersByMovieId: [asyncErrorBoundary(readTheatersByMovieId)],
  readReviewsByMovieId: [asyncErrorBoundary(readReviewsByMovieId)],
};
