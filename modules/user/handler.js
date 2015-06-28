'use strict';

const boom = require('boom');
const mongoose = require('mongoose');
const schema = require('./schema');

// create user model from schema
const User = mongoose.model('User', schema);

mongoose.connect('mongodb://localhost/nicest');

module.exports = {
    create: function (request, reply) {
        reply('hello world');
    },
    read: function (request, reply) {
        reply('hello world');
    },
    update: function (request, reply) {
        reply('hello world');
    },
    delete: function (request, reply) {
        reply('hello world');
    },
    list: function (request, reply) {
        User
            .find()
            .select('_id')
            .exec(function (err, userids) {
                if (err) {
                    reply(boom.notFound('not found'));
                } else {
                    reply(userids);
                }
            });
    }
};
