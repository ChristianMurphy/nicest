'use strict';

const mongoose = require('mongoose');

// setup mongoose
module.exports = function (database) {
    mongoose.connect(database, function (err) {
        if (err) {
            console.log('Mongo DB not found');
        }
    });
}
