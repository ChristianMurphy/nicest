'use strict';

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;

module.exports = {
    redirect: function (request, reply) {
        if (request.session.get('github-username') && request.session.get('github-password')) {
            reply().redirect('/recipe/github/login');
        } else {
            reply().redirect('/recipe/github-individual-project/choose');
        }
    },
    choose: function (request, reply) {
        const Github = new Octokat({
            username: request.session.get('github-username'),
            password: request.session.get('github-password')
        });

        Github.me.repos.fetch().then(function (repos) {
            reply.view('modules/github-individual-project/view/choose', {repos: repos});
        });
    }
};
