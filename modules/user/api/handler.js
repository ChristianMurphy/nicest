'use strict';

const boom = require('boom');
const User = require('../model/user');
const _ = require('lodash');

module.exports = {
    create: function (request, reply) {
        User
            .create(request.payload)
            .then(
                function (newUser) {
                    reply(newUser).code(201);
                },
                function () {
                    reply(boom.badRequest());
                }
            );
    },
    read: function (request, reply) {
        User
            .read(request.params.id)
            .then(
                function (user) {
                    if (user) {
                        reply(user);
                    } else {
                        reply(boom.notFound());
                    }
                },
                function () {
                    reply(boom.notFound());
                }
            );
    },
    update: function (request, reply) {
        User
            .update(request.params.id, request.payload)
            .then(
                function (user) {
                    if (user) {
                        reply(user);
                    } else {
                        reply(boom.notFound());
                    }
                },
                function () {
                    reply(boom.badRequest());
                }
            );
    },
    delete: function (request, reply) {
        User
            .delete(request.params.id)
            .then(
                function () {
                    reply().code(204);
                },
                function () {
                    reply().code(204);
                }
            );
    },
    list: function (request, reply) {
        User
            .list('_id')
            .then(
                function (userIds) {
                    reply(_.pluck(userIds, '_id'));
                },
                function () {
                    reply(boom.notFound());
                }
            );
    }
};
