'use strict';

/**
 * @module user/model
 */

const mongoose = require('mongoose');

/**
 * a User is a person.
 * @typedef {Object} User
 * @property {String} name - user's name.
 * @property {String} role - role and permissions a user has
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
        ],
        default: 'student'
    },
    modules: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('User', schema);
