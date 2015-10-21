'use strict';

const mongoose = require('mongoose');

// setup mongoose
module.exports = function (configuration) {
    const config = configuration.database;

    mongoose.connect(config.hostname, config.database, config.port, function (err) {
        if (err) {
            console.log('Mongo DB not found');
        }
    });
};
