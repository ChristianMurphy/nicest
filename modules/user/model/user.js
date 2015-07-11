'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    modules: mongoose.Schema.Types.Mixed
});

const User = mongoose.model('User', schema);

/**
 * @module user/model
 */
module.exports = {
    /**
     * Creates a new User
     * @function create
     * @param {Object} user {name: string, modules: object}
     * @returns {Promise} resolves to User object
     */
    create: function (user) {
        return User.create(user);
    },
    /**
     * Reads an existing user
     * @function read
     * @param {String} id hex Mongoose id
     * @returns {Promise} resolves to User object
     */
    read: function (id) {
        return User
            .findOne({
                _id: id
            })
            .exec();
    },
    /**
     * Updates an existing user
     * @param {String} id hex Mongoose id
     * @function update
     * @param {Object} properties new or different properties to be set
     * @returns {Promise} resolves to updated User object
     */
    update: function (id, properties) {
        return User
            .findOneAndUpdate(
                {
                    _id: id
                },
                properties
            )
            .exec();
    },
    /**
     * Deletes an existing user
     * @function delete
     * @param {String} id hex Mongoose id
     * @returns {Promise} resolves with deleted User information
     */
    delete: function (id) {
        return User
            .remove({
                _id: id
            })
            .exec();
    },
    /**
     * Lists all the User ids
     * @function list
     * @returns {Promise} resolves to an {Array} of {String}
     */
    list: function () {
        return User
            .find({})
            .select('_id')
            .exec();
    }
};
