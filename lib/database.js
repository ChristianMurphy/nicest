'use strict';

/**
 * @module core/lib/database
 */

const mongoose = require('mongoose');

/**
 * Sets up Mongoose
 * @param {Object} configuration - host name, database name and port of Mongo
 * @returns {Null} nothing
 */
function setupDatabase (configuration) {
    const config = configuration.database;

    // set Mongoose Promise to native Promise
    mongoose.Promise = Promise;
    mongoose.connect(config.hostname, config.database, config.port, (err) => {
        if (err) {
            console.log('Mongo DB not found');
        }
    });
}

module.exports = setupDatabase;
