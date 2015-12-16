/**
 * @module Team
 */
'use strict';

const mongoose = require('mongoose');

/**
 * A Team is a group of {User}.
 * @typedef {Object} Team
 * @property {String} name - team's name.
 * @property {ObjectId[]} members - {User}s who are a part of this {Team}.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    modules: mongoose.Schema.Types.Mixed
});

const Team = mongoose.model('Team', schema);

/**
 * Creates a new Team
 * @param {Team} team - new team
 * @returns {Promise.<Team>} new {Team}
 */
function create (team) {
    return Team.create(team);
}

/**
 * Reads an existing Team
 * @param {String} id - hex Mongoose id
 * @returns {Promise.<Team>} selected {Team}
 */
function read (id) {
    return Team
        .findOne({
            _id: id
        })
        .exec();
}

/**
 * Updates an existing Team
 * @param {String} id - hex Mongoose id
 * @param {Team} properties - new or different properties to be set
 * @returns {Promise.<Team>} updated {Team}
 */
function update (id, properties) {
    return Team
        .findOneAndUpdate({_id: id}, properties)
        .exec();
}

/**
 * Removes an existing Team
 * @param {String} id - hex Mongoose id
 * @returns {Promise.<Team>} removed {Team}
 */
function remove (id) {
    return Team
        .remove({
            _id: id
        })
        .exec();
}

/**
 * Lists all the Team ids
 * @param {String} select - space seperated list of columns to select
 * @returns {Promise.<Array>} lists all the {Team}
 */
function list (select) {
    return Team
        .find({})
        .select(select)
        .exec();
}

module.exports = {create, read, update, remove, list};
