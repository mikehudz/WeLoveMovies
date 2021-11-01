const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)   // returns a list of all theaters and the movies playing at them
    .all(methodNotAllowed);

module.exports = router;