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

    const adminUser = {};

    adminUser.admin = true;

    read({
        prompt: 'name:'
    })
    .then((userName) => {
        adminUser.name = userName;

        return read({
            prompt: 'Github Username:'
        });
    })
    .then((username) => {
        adminUser.modules = {};
        adminUser.modules.github = {username};

        return user.create(adminUser);
    })
    .then(() => {
        mongoose.disconnect();
    });
}

admin.description = 'Creates an administrator.';

module.exports = admin;
