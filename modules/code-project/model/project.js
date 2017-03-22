'use strict';

/**
 * @module code-project/model/project
 */

const mongoose = require('mongoose');

/**
 * A Project is a provisioned code project.
 * @typedef {Object} Project
 * @property {String} name - team's name.
 * @property {String} github-url - Short hand link to the GitHub repos
 * @property {String} slack-token - Slack token for API access
 * @property {String} taiga-slug - Shorthand link to Taiga board
 * @property {Array<String>} slack-groups - {Array} of {String} with slack channel ids
 * @property {ObjectId} course - {Course} that the code project was provisioned for
 * @property {ObjectId} team - {Team} that the code project was provisioned for
 * @property {ObjectId[]} members - {User}s who are members of the team.
 * @property {ObjectId[]} instructors - {User}s teaching or grading code project.
 */
const schema = new mongoose.Schema({
    course: {
        ref: 'Course',
        type: mongoose.Schema.Types.ObjectId
    },
    'github-token': String,
    'github-url': String,
    instructors: [{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }],
    members: [{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }],
    name: String,
    'slack-groups': [String],
    'slack-token': String,
    'taiga-slug': String,
    'taiga-token': String,
    team: {
        ref: 'Team',
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Project', schema);
