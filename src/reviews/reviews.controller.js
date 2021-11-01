const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// If reviewId exists, store review in res.locals.review
// If not, return 404 "Review cannot be found."
async function checkIfReviewExists(req, res, next) {
    const reviewData = await reviewsService.read(req.params.reviewId);
    const review = reviewData[0];
    if (review) {
        res.locals.review = review;
        return next()
    }
    next({
        status: 404,
        message: "Review cannot be found."
    });
}

// returns a list of reviews
async function read(req, res) {
    const { review: reviewData } = res.locals; // res.locals.review = reviewsService.read(req.params.reviewId)
    res.json({ data: review });
}

async function readAndAppendCritic(req, res) {
    const review = await reviewsService.readAndAppendCritic(req.params.reviewId)
    review.critic.critic_id = review.critic_id;
    res.json({ data: review });
}

async function update(req, res) {
    const updatedReview = { ...req.body.data };
    const reviewId = req.params.reviewId;
    await reviewsService.update(updatedReview, reviewId);
    const update = await reviewsService.readAndAppendCritic(reviewId);
    res.json({ update });
}

async function destroy(req, res) {
    const reviewId = req.params.reviewId;
    await reviewsService.delete(reviewId);
    res.sendStatus(204);
}

module.exports = {
    read: [asyncErrorBoundary(checkIfReviewExists), read],
    readAndAppendCritic: [asyncErrorBoundary(checkIfReviewExists), readAndAppendCritic],
    update: [asyncErrorBoundary(checkIfReviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(checkIfReviewExists), asyncErrorBoundary(destroy)],
};