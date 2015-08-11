'use strict';

const Octokat = require('octokat');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/github/login');
    },
    loginView: function (request, reply) {
        reply.view('modules/github/view/login');
    },
    loginAction: function (request, reply) {
        request.session.set({
            'github-username': request.payload.username,
            'github-password': request.payload.password
        });

        reply().redirect('/recipe/github/list');
    },
    list: function (request, reply) {
        const Github = new Octokat({
            username: request.session.get('github-username'),
            password: request.session.get('github-password')
        });

        Github.me.repos.fetch().then(function (repos) {
            reply.view('modules/github/view/list', {repos: repos});
        });
    }
};
