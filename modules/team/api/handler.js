'use strict';

const boom = require('boom');
const Team = require('../model/team');
const _ = require('lodash');

const httpCreated = 201;
const httpNoContent = 204;

module.exports = {
    create (request, reply) {
        Team
            .create(request.payload)
            .then((newTeam) => {
                reply(newTeam).code(httpCreated);
            })
            .catch(() => {
                reply(boom.badRequest());
            });
    },
    read (request, reply) {
        Team
            .read(request.params.id)
            .then((team) => {
                if (team) {
                    reply(team);
                } else {
                    reply(boom.notFound());
                }
            })
            .catch(() => {
                reply(boom.notFound());
            });
    },
    update (request, reply) {
        Team
            .update(request.params.id, request.payload)
            .then((team) => {
                if (team) {
                    reply(team);
                } else {
                    reply(boom.notFound());
                }
            })
            .catch(() => {
                reply(boom.badRequest());
            });
    },
    delete (request, reply) {
        Team
            .remove(request.params.id)
            .then(() => {
                reply().code(httpNoContent);
            })
            .catch(() => {
                reply().code(httpNoContent);
            });
    },
    list (request, reply) {
        Team
            .list()
            .then((teamIds) => {
                reply(_.pluck(teamIds, '_id'));
            })
            .catch(() => {
                reply(boom.notFound());
            });
    }
};
