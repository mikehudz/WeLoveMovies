const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(specifiedId) {
    return knex("reviews as r")
        .select("*")
        .where({ review_id: specifiedId });
}

function readAndAppendCritic(specifiedId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: specifiedId })
        .first()
        .then(addCritic);
}

function update(updatedReview, specifiedId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: specifiedId })
        .update(updatedReview);
}

function destroy(specifiedId) {
    return knex("reviews")
        .where({ review_id: specifiedId })
        .del();
}

module.exports = {
    read,
    readAndAppendCritic,
    update,
    delete: destroy,
};