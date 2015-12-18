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
        ],
        default: 'student'
    },
    modules: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('User', schema);
