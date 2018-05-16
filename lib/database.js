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
function setupDatabase ({database: {hostname, name, port}}) {
    // Set Mongoose Promise to native Promise
    mongoose.Promise = Promise;
    mongoose.createConnection(`mongodb://${hostname}:${port}/${name}`);
}

module.exports = setupDatabase;
