'use strict';

/**
 * @module team/model
 */

const mongoose = require('mongoose');

/**
 * A Team is a group of {User}.
 * @typedef {Object} Team
 * @property {String} name - team's name.
 * @property {ObjectId[]} members - {User}s who are a part of this {Team}.
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    modules: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Team', schema);
