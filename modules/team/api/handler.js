'use strict';

const boom = require('boom');
const Team = require('../model/team');
const _ = require('lodash');

module.exports = {
    create: function (request, reply) {
        Team
            .create(request.payload)
            .then(
                (newTeam) => {
                    reply(newTeam).code(201);
                },
                () => {
                    reply(boom.badRequest());
                }
            );
    },
    read: function (request, reply) {
        Team
            .read(request.params.id)
            .then(
                (team) => {
                    if (team) {
                        reply(team);
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
        Team
            .update(request.params.id, request.payload)
            .then(
                (team) => {
                    if (team) {
                        reply(team);
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
        Team
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
        Team
            .list()
            .then(
                (teamIds) => {
                    reply(_.pluck(teamIds, '_id'));
                },
                () => {
                    reply(boom.notFound());
                }
            );
    }
};
