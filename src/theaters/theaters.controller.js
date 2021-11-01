const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function readMoviesByTheaterId(req, res) {
    const theaterId = req.params.theaterId;
    const data = await service.readMoviesByTheaterId(theaterId);
    res.json({ data });
}

async function list(req, res, next) {
    const theaters = await theatersService.list();
    const data = await Promise.all(theaters.map( async (theater) => {
        const movies = await theatersService.readMoviesByTheaterId(theater.theater_id);
        theater.movies = movies;
        return theater;
    }));
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    readMoviesByTheaterId: asyncErrorBoundary(readMoviesByTheaterId),
};