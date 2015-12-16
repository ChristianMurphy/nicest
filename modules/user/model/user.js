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
    role: {
        type: String,
        enum: [
            'admin',
            'instructor',
            'student'
        ]
    },
    modules: mongoose.Schema.Types.Mixed
});

const User = mongoose.model('User', schema);

/**
 * Creates a new User
 * @param {User} user - new user
 * @returns {Promise.<User>} new {User}
 */
function create (user) {
    return User.create(user);
}

/**
 * Reads an existing user
 * @param {String} id - hex Mongoose id
 * @returns {Promise.<User>} selected {User}
 */
function read (id) {
    return User
        .findOne({
            _id: id
        })
        .exec();
}

/**
 * Updates an existing user
 * @param {String} id - hex Mongoose id
 * @param {User} properties - new or different properties to be set
 * @returns {Promise.<User>} updated {User}
 */
function update (id, properties) {
    return User
        .findOneAndUpdate({_id: id}, properties)
        .exec();
}

/**
 * Removes an existing user
 * @param {String} id - hex Mongoose id
 * @returns {Promise.<User>} removed {User}
 */
function remove (id) {
    return User
        .remove({
            _id: id
        })
        .exec();
}

/**
 * Lists all the User ids
 * @param {String} select - space seperated list of columns to select
 * @returns {Promise.<Array>} resolves to an {Array} of {User}
 */
function list (select) {
    return User
        .find({})
        .select(select)
        .exec();
}

module.exports = {create, read, update, remove, list};
