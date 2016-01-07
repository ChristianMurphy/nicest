'use strict';

/**
 * @module core/tasks/user
 */

/**
 * Creates a new user.
 * @returns {Null} nothing
 */
function user () {
    const chalk = require('chalk');
    const read = require('./helpers/read-promise');
    const database = require('../lib/database');
    const mongoose = require('mongoose');
    const configuration = require('../nicest.json');

    database(configuration);

    const userModel = require('../modules/user/model/user');

    console.log(chalk.bold('\nCreate a new user\n'));

    const newUser = {};

    read({
        prompt: 'name:'
    })
    .then((userName) => {
        newUser.name = userName;

        return read({
            prompt: 'user role:',
            default: 'admin'
        });
    })
    .then((role) => {
        newUser.role = role;

        return read({
            prompt: 'github username:'
        });
    })
    .then((username) => {
        newUser.modules = {};
        newUser.modules.github = {username};

        return userModel.create(newUser);
    })
    .then(() => {
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error(err);
        mongoose.disconnect();
    });
}

user.description = 'Creates a new user.';

module.exports = user;
