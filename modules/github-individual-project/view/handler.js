'use strict';

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;
const User = require('../../../lib/server').server.plugins.user;
const _ = require('lodash');

module.exports = {
    redirect: function (request, reply) {
        if (typeof request.session.get('github-username') === 'string' && typeof request.session.get('github-password') === 'string') {
            reply().redirect('/recipe/github-individual-project/choose-repository');
        } else {
            reply().redirect('/recipe/github/login');
        }
    },
    chooseRepository: function (request, reply) {
        const Github = new Octokat({
            username: request.session.get('github-username'),
            password: request.session.get('github-password')
        });

        Github.me.repos.fetch().then(function (repos) {
            reply.view('modules/github-individual-project/view/choose-repository', {repos: repos});
        });
    },
    selectRepository: function (request, reply) {
        request.session.set({
            'github-individual-project-repo': request.payload.repo
        });

        reply().redirect('/recipe/github-individual-project/choose-students');
    },
    chooseStudents: function (request, reply) {
        User
            .list('name modules')
            .then(function (users) {
                reply.view('modules/github-individual-project/view/choose-students', {
                    students: filterGithubUsers(users)
                });
            });
    },
    selectStudents: function (request, reply) {
        request.session.set({
            'github-individual-project-repo': request.payload.repo
        });

        reply().redirect('/recipe/github-individual-project/confirm');
    }
};

function filterGithubUsers (users) {
    return _.filter(users, function (user) {
        return _.has(user, 'modules.github.username');
    });
}
