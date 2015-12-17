'use strict';

const boom = require('boom');
const User = require('../model/user');
const _ = require('lodash');

const httpCreated = 201;
const httpNoContent = 204;

module.exports = {
    create (request, reply) {
        User
            .create(request.payload)
            .then((newUser) => {
                reply(newUser).code(httpCreated);
            })
            .catch(() => {
                reply(boom.badRequest());
            });
    },
    read (request, reply) {
        User
            .findOne({
                _id: request.params.id
            })
            .exec()
            .then((user) => {
                if (user) {
                    reply(user);
                } else {
                    reply(boom.notFound());
                }
            })
            .catch(() => {
                reply(boom.notFound());
            });
    },
    update (request, reply) {
        User
            .findOneAndUpdate({_id: request.params.id}, request.payload)
            .exec()
            .then((user) => {
                if (user) {
                    reply(user);
                } else {
                    reply(boom.notFound());
                }
            })
            .catch(() => {
                reply(boom.badRequest());
            });
    },
    delete (request, reply) {
        User
            .remove({
                _id: request.params.id
            })
            .then(() => {
                reply().code(httpNoContent);
            })
            .catch(() => {
                reply().code(httpNoContent);
            });
    },
    list (request, reply) {
        User
            .find({})
            .select('_id')
            .exec()
            .then((userIds) => {
                reply(_.pluck(userIds, '_id'));
            })
            .catch(() => {
                reply(boom.notFound());
            });
    }
};
