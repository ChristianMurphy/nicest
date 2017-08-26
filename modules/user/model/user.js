/**
 * @module user/model
 */

const mongoose = require('mongoose');

/**
 * A User is a person.
 * @typedef {Object} User
 * @property {String} name - user's name.
 * @property {String} role - role and permissions a user has
 * @property {Object} modules - area where external modules can register attributes.
 */
const schema = new mongoose.Schema({
    modules: mongoose.Schema.Types.Mixed,
    name: String,
    role: {
        default: 'student',
        enum: [
            'admin',
            'instructor',
            'student',
        ],
        type: String,
    },
});

module.exports = mongoose.model('User', schema);
