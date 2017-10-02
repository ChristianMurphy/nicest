/**
 * @module core/tasks/user
 */

/**
 * Creates a new user.
 * @returns {Null} nothing
 */
function user() {
    // eslint-disable-next-line global-require
    const chalk = require('chalk');
    // eslint-disable-next-line global-require
    const read = require('./helpers/read-promise');
    // eslint-disable-next-line global-require
    const database = require('../lib/database');
    // eslint-disable-next-line global-require
    const mongoose = require('mongoose');
    // eslint-disable-next-line global-require
    const configuration = require('../nicest.json');

    database(configuration);

    // eslint-disable-next-line global-require
    const userModel = require('../modules/user/model/user');

    console.log(chalk.bold('\nCreate a new user\n'));

    const newUser = {};

    read({ prompt: 'name:' })
        .then((userName) => {
            newUser.name = userName;

            return read({
                default: 'admin',
                prompt: 'user role:',
            });
        })
        .then((role) => {
            newUser.role = role;

            return read({ prompt: 'github username:' });
        })
        .then((username) => {
            newUser.modules = {};
            newUser.modules.github = { username };

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
