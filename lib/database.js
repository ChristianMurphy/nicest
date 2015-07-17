'use strict';

const mongoose = require('mongoose');

// setup mongoose
module.exports = function (database) {
    mongoose.connect(database);
}
