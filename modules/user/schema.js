'use strict';

const Schema = require('mongoose').Schema;

module.exports = {
    schema: new Schema({
        username: String,
        plugins: Schema.Types.Mixed
    })
};
