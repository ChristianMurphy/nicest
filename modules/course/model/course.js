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
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    modules: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Course', schema);
