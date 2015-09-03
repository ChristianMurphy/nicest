/* eslint no-underscore-dangle: 0 */
'use strict';

const Team = require('../model/team');
const User = require('../../../lib/server').server.plugins.user;

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/manage-teams/list');
    },
    list: function (request, reply) {
        Team
            .list('_id name')
            .then(function (teams) {
                reply.view('modules/team/view/list', {teams: teams});
            });
    },
    view: function (request, reply) {
        Promise.all([
            Team.read(request.params.id),
            User.list('_id name')
        ])
            .then(function (data) {
                const team = data[0];
                const users = data[1];

                reply.view('modules/team/view/view', {
                    url: '/recipe/manage-teamss/edit/' + team._id,
                    saved: request.query.saved,
                    team: {
                        name: team.name,
                        modules: team.modules || {}
                    },
                    users: users
                });
            });
    },
    save: function (request, reply) {
        Team
            .update(request.params.id, request.payload)
            .then(function () {
                reply().redirect('/recipe/manage-teams/edit/' + request.params.id + '?saved=true');
            });
    },
    viewEmpty: function (request, reply) {
        User.list('_id name')
            .then(function (users) {
                reply.view('modules/team/view/view', {
                    url: '/recipe/manage-teams/create',
                    team: {
                        name: '',
                        modules: {}
                    },
                    users: users
                });
            });
    },
    create: function (request, reply) {
        Team
            .create(request.payload)
            .then(function (team) {
                reply().redirect('/recipe/manage-teams/edit/' + team._id + '?saved=true');
            });
    },
    delete: function (request, reply) {
        Team
            .delete(request.params.id)
            .then(function () {
                reply().redirect('/recipe/manage-teams/list');
            });
    }
};
