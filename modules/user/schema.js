'use strict';

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    username: String,
    plugins: Schema.Types.Mixed
});
