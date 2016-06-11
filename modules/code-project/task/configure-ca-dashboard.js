'use strict';

/**
 * @module code-project/task/configure-ca-dashboard
 */

const mongoose = require('mongoose');

/**
 * Member is metadata for a user
 * @typedef {Object} Member
 * @property {String} name - name of the user
 * @property {String} github-username - User's Github Username
 * @property {String} email - Email that Taiga invite will be sent to
 */
const Member = new mongoose.Schema({
    name: String,
    'github-username': String,
    email: String
});

/**
 * Member is metadata for an instructor
 * @typedef {Object} Instructor
 * @property {String} name - name of the user
 * @property {String} email - Email address
 */
const Instructor = new mongoose.Schema({
    name: String,
    email: String
});

/**
 * Project is meta data and collaborator information for a project.
 * @typedef {Object} Project
 * @property {String} name - name of the team
 * @property {String} github-url - Short hand link to the Github repos
 * @property {String} taiga-slug - Shorthand link to Taiga board
 * @property {Array<Object>} members - {Array} of {Member} with user meta data
 * @property {Array<String>} instructors - {Array} of {String} with instructor ids
 */
const Project = new mongoose.Schema({
    name: String,
    'github-url': String,
    'taiga-slug': String,
    members: [Member],
    instructors: [Instructor]
});

const connection = mongoose.createConnection('mongodb://localhost/NicestDashboard');

const integration = connection.model('integration', Project);

/**
 * Stores a list of new projects to Mongo for CA Dashboard to use.
 * @param {Array} metaData - {Array} of {Project} with Project info
 * @returns {Null} returns after completion
 */
function configureCaDashboard (metaData) {
    integration
        .collection
        .insert(metaData, () => null);
}

module.exports = configureCaDashboard;
