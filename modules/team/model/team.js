/**
 * @module Team
 */
'use strict';

const mongoose = require('mongoose');

/**
 * A Team is a group of Users.
 * @typedef {Object} Team
 * @property {String} name - team's name.
 * @property {Array} members - list of user ids.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    name: String,
    members: [String],
    modules: mongoose.Schema.Types.Mixed
});

const Team = mongoose.model('Team', schema);

module.exports = {
    /**
     * Creates a new Team
     * @function create
     * @param {Team} team - new team
     * @returns {Promise.<Team>} new {Team}
     */
    create: function (team) {
        return Team.create(team);
    },
    /**
     * Reads an existing Team
     * @function read
     * @param {String} id - hex Mongoose id
     * @returns {Promise.<Team>} selected {Team}
     */
    read: function (id) {
        return Team
            .findOne({
                _id: id
            })
            .exec();
    },
    /**
     * Updates an existing Team
     * @function update
     * @param {String} id - hex Mongoose id
     * @param {Team} properties - new or different properties to be set
     * @returns {Promise.<Team>} updated {Team}
     */
    update: function (id, properties) {
        return Team
            .findOneAndUpdate({_id: id}, properties)
            .exec();
    },
    /**
     * Deletes an existing Team
     * @function delete
     * @param {String} id - hex Mongoose id
     * @returns {Promise.<Team>} deleted {Team}
     */
    delete: function (id) {
        return Team
            .remove({
                _id: id
            })
            .exec();
    },
    /**
     * Lists all the Team ids
     * @function list
     * @param {String} select - space seperated list of columns to select
     * @returns {Promise.<Array>} lists all the {Team}
     */
    list: function (select) {
        return Team
            .find({})
            .select(select)
            .exec();
    }
};
