/**
 * @module course/model
 */

'use strict';

const mongoose = require('mongoose');

/**
 * A Course is a collection of {User} and {Team}.
 * @typedef {Object} Course
 * @property {String} name - team's name.
 * @property {ObjectId[]} students - {User}s who are participating in course.
 * @property {ObjectId[]} instructors - {User}s teaching or grading course.
 * @property {ObjectId[]} teams - {Team}s who are participating in course.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    instructors: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    modules: mongoose.Schema.Types.Mixed,
    name: String,
    students: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    teams: [
        {
            ref: 'Team',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
});

module.exports = mongoose.model('Course', schema);
