const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .get(controller.readAndAppendCritic)          //reads the specified review
    .put(controller.update)                 //updates the specified review
    .delete(controller.delete)              //deletes the specified review
    .all(methodNotAllowed);

module.exports = router;