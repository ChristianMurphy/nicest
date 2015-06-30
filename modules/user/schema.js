'use strict';

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    username: String,
    modules: Schema.Types.Mixed
});
