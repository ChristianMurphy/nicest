'use strict';

const boom = require('boom');
const mongoose = require('mongoose');
const _ = require('lodash');
const schema = require('./schema');

// create user model from schema
const User = mongoose.model('User', schema);

module.exports = {
    create: function (request, reply) {
        const newUser = new User(request.payload);

        newUser.save(function (err) {
            if (err) {
                reply(boom.badRequest('invalid user'));
            } else {
                reply(newUser).code(201);
            }
        });
    },
    read: function (request, reply) {
        User
            .findOne({
                _id: request.params.id
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
                _id: request.params.id
            },
            request.payload,
            function (err, updateUser) {
                if (err) {
                    reply(boom.badRequest('user does not exist'));
                } else {
                    reply(updateUser);
                }
            });
    },
    delete: function (request, reply) {
        User
            .remove({
                _id: request.params.id
            },
            function (err) {
                if (err) {
                    return reply().code(204);
                }
                reply().code(204);
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
                    reply(_.pluck(userids, '_id'));
                }
            });
    }
};
