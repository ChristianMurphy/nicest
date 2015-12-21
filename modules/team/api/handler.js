'use strict';

const boom = require('boom');
const Team = require('../model/team');

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
            .findOne({
                _id: request.params.id
            })
            .exec()
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
            .findOneAndUpdate({_id: request.params.id}, request.payload)
            .exec()
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
        Team
            .find({})
            .exec()
            .then((teamIds) => {
                reply(teamIds.map((element) => {
                    return element._id;
                }));
            })
            .catch(() => {
                reply(boom.notFound());
            });
    }
};
