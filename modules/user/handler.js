'use strict';

const boom = require('boom');
const mongoose = require('mongoose');
const schema = require('./schema');

// create user model from schema
const User = mongoose.model('User', schema);

mongoose.connect('mongodb://localhost/nicest');

module.exports = {
    create: function (request, reply) {
        const newUser = new User(JSON.parse(request.payload));
        newUser.save(function (err) {
            if (err) {
                reply(boom.badRequest('invalid user'));
            } else {
                reply('created').code(201);
            }
        });
    },
    read: function (request, reply) {
        User
            .findOne({
                _id: request.params.userid
            })
            .exec(function (err, user) {
                if (err) {
                    reply(boom.notFound('not found'));
                } else {
                    reply(user);
                }
            });
    },
    update: function (request, reply) {
        User
            .findOneAndUpdate({
                _id: request.params.userid
            },
            request.payload,
            function (err, updateUser) {
                if (err) {
                    reply(boom.notFound('not found'));
                } else {
                    reply(updateUser);
                }
            })
    },
    delete: function (request, reply) {
        User
            .remove({
                _id: request.params.userid
            },
            function (err) {
                if (err) {
                    reply(boom.notFound('not found'));
                } else {
                    reply().code(204);
                }
            });
    },
    list: function (request, reply) {
        User
            .find({})
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
