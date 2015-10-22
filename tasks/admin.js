'use strict';

const chalk = require('chalk');

const read = require('./helpers/read-promise');
const database = require('../lib/database');
const mongoose = require('mongoose');

/**
 * Creates an administrator.
 * @returns {Null} nothing
 */
function admin () {
    const configuration = require('../nicest.json');

    database(configuration);

    const user = require('../modules/user/model/user');

    console.log(chalk.bold('\nCreate an Administrator\n'));

    const admin = {};

    admin.admin = true;

    read({
        prompt: 'name:'
    })
    .then(function (userName) {
        admin.name = userName;

        return read({
            prompt: 'Github Username:'
        });
    })
    .then(function (userGithubName) {
        admin.modules = {};
        admin.modules.github = {};
        admin.modules.github.username = userGithubName;

        return user.create(admin);
    })
    .then(function () {
        mongoose.disconnect();
    });
}

admin.description = 'Creates an administrator.';

module.exports = admin;
