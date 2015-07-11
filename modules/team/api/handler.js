'use strict';

const boom = require('boom');
const Team = require('../model/team');
const _ = require('lodash');

module.exports = {
    create: function (request, reply) {
        Team
            .create(request.payload)
            .then(
                function (newTeam) {
                    reply(newTeam).code(201);
                },
                function () {
                    reply(boom.badRequest());
                }
            );
    },
    read: function (request, reply) {
        Team
            .read(request.params.id)
            .then(
                function (team) {
                    if (team) {
                        reply(team);
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
        Team
            .update(request.params.id, request.payload)
            .then(
                function (team) {
                    if (team) {
                        reply(team);
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
        Team
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
        Team
            .list()
            .then(
                function (teamIds) {
                    reply(_.pluck(teamIds, '_id'));
                },
                function () {
                    reply(boom.notFound());
                }
            );
    }
};
