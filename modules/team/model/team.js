'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    members: [String],
    modules: mongoose.Schema.Types.Mixed
});

const Team = mongoose.model('Team', schema);

/**
 * @module team/model
 */
module.exports = {
    /**
     * Creates a new Team
     * @function create
     * @param {Object} team {name: string, members: [string] modules: object}
     * @returns {Promise} resolves to Team object
     */
    create: function (team) {
        return Team.create(team);
    },
    /**
     * Reads an existing Team
     * @function read
     * @param {String} id hex Mongoose id
     * @returns {Promise} resolves to Team object
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
     * @param {String} id hex Mongoose id
     * @function update
     * @param {Object} properties new or different properties to be set
     * @returns {Promise} resolves to updated Team object
     */
    update: function (id, properties) {
        return Team
            .findOneAndUpdate(
                {
                    _id: id
                },
                properties
            )
            .exec();
    },
    /**
     * Deletes an existing Team
     * @function delete
     * @param {String} id hex Mongoose id
     * @returns {Promise} resolves with deleted Team information
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
     * @returns {Promise} resolves to an {Array} of {String}
     */
    list: function () {
        return Team
            .find({})
            .select('_id')
            .exec();
    }
};
