'use strict';

const Octokat = require('octokat');
const Github = new Octokat();

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/github/choose');
    },
    login: function (request, reply) {
        reply.view('modules/github/view/choose');
    },
    list: function (request, reply) {
        Github.users('ChristianMurphy').repos.fetch().then(function (repo) {
            console.log(repo);
            reply.view('modules/github/view/list');
        });
    }
};
