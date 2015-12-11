'use strict';

const mongoose = require('mongoose');

/**
 * Sets up Mongoose
 * @param {Object} configuration - host name, database name and port of Mongo
 * @returns {Null} nothing
 */
function setupDatabase (configuration) {
    const config = configuration.database;

    mongoose.connect(config.hostname, config.database, config.port, (err) => {
        if (err) {
            console.log('Mongo DB not found');
        }
    });
}

module.exports = setupDatabase;
