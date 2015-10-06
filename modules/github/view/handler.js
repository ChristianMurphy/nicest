'use strict';

const Octokat = require('octokat');

module.exports = {
    redirect: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(prefix + '/recipe/github/login');
    },
    loginView: function (request, reply) {
        reply.view('modules/github/view/login', {redirect: request.query.next || 'none'});
    },
    loginAction: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        request.session.set({
            'github-username': request.payload.username,
            'github-password': request.payload.password
        });

        if (request.payload.redirect === 'none') {
            reply().redirect(prefix + '/recipe/github/list');
        } else {
            reply().redirect(request.payload.redirect);
        }
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
