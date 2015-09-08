'use strict';

const boom = require('boom');
const User = require('../model/user');
const _ = require('lodash');

module.exports = {
    create: function (request, reply) {
        User
            .create(request.payload)
            .then(
                (newUser) => {
                    reply(newUser).code(201);
                },
                () => {
                    reply(boom.badRequest());
                }
            );
    },
    read: function (request, reply) {
        User
            .read(request.params.id)
            .then(
                (user) => {
                    if (user) {
                        reply(user);
                    } else {
                        reply(boom.notFound());
                    }
                },
                () => {
                    reply(boom.notFound());
                }
            );
    },
    update: function (request, reply) {
        User
            .update(request.params.id, request.payload)
            .then(
                (user) => {
                    if (user) {
                        reply(user);
                    } else {
                        reply(boom.notFound());
                    }
                },
                () => {
                    reply(boom.badRequest());
                }
            );
    },
    delete: function (request, reply) {
        User
            .delete(request.params.id)
            .then(
                () => {
                    reply().code(204);
                },
                () => {
                    reply().code(204);
                }
            );
    },
    list: function (request, reply) {
        User
            .list('_id')
            .then(
                (userIds) => {
                    reply(_.pluck(userIds, '_id'));
                },
                () => {
                    reply(boom.notFound());
                }
            );
    }
};
