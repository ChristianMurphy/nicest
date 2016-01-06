'use strict';

const Octokat = require('octokat');

module.exports = {
    redirect (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/github/login`);
    },
    loginView (request, reply) {
        reply.view('modules/github/view/login', {redirect: request.query.next || 'none'});
    },
    loginAction (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        request.yar.set({
            'github-username': request.payload.username,
            'github-password': request.payload.password
        });

        if (request.payload.redirect === 'none') {
            reply().redirect(`${prefix}/recipe/github/list`);
        } else {
            reply().redirect(request.payload.redirect);
        }
    },
    list (request, reply) {
        const Github = new Octokat({
            username: request.yar.get('github-username'),
            password: request.yar.get('github-password')
        });

        Github.me.repos.fetch().then((repos) => {
            reply.view('modules/github/view/list', {repos});
        });
    }
};
