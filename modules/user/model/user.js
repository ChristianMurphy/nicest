/**
 * @module User
 */
'use strict';

const mongoose = require('mongoose');

/**
 * a User is a person.
 * @typedef {Object} User
 * @property {String} name - user's name.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    name: String,
    admin: Boolean,
    modules: mongoose.Schema.Types.Mixed
});

const User = mongoose.model('User', schema);

module.exports = {
    /**
     * Creates a new User
     * @function create
     * @param {User} user - new user
     * @returns {Promise.<User>} new {User}
     */
    create: function (user) {
        return User.create(user);
    },
    /**
     * Reads an existing user
     * @function read
     * @param {String} id - hex Mongoose id
     * @returns {Promise.<User>} selected {User}
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
     * @function update
     * @param {String} id - hex Mongoose id
     * @param {User} properties - new or different properties to be set
     * @returns {Promise.<User>} updated {User}
     */
    update: function (id, properties) {
        return User
            .findOneAndUpdate({_id: id}, properties)
            .exec();
    },
    /**
     * Deletes an existing user
     * @function delete
     * @param {String} id - hex Mongoose id
     * @returns {Promise.<User>} deleted {User}
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
     * @param {String} select - space seperated list of columns to select
     * @returns {Promise.<Array>} resolves to an {Array} of {User}
     */
    list: function (select) {
        return User
            .find({})
            .select(select)
            .exec();
    }
};
