/**
 * @module Course
 */
'use strict';

const mongoose = require('mongoose');

/**
 * A Course is a collection of {User} and {Team}.
 * @typedef {Object} Course
 * @property {String} name - team's name.
 * @property {ObjectId[]} students - {User}s who are a part.
 * @property {ObjectId[]} instructors - {User}s who are a part.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    modules: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Team', schema);
