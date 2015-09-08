'use strict';

const mongoose = require('mongoose');

// setup mongoose
module.exports = (database) => {
    mongoose.connect(database, (err) => {
        if (err) {
            console.log('Mongo DB not found');
        }
    });
};
