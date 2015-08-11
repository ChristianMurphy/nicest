'use strict';

const boom = require('boom');

module.exports = {
    redirect: function (request, reply) {
        if (request.session.get('github-username') && request.session.get('github-password')) {
            reply().redirect('/recipe/github/login');
        } else {
            reply().redirect('/recipe/github-individual-project/choose');
        }
    },
    choose: function (request, reply) {
        reply(boom.notImplemented());
    }
};
