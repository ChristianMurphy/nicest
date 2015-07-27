'use strict';

const Github = require('octokat');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/github/choose');
    },
    choose: function (request, reply) {
        reply.view('modules/github/view/choose');
    },
    list: function (request, reply) {
        Github.repos('ChristianMurphy', 'nicest').then(function (repo) {
            console.log(repo);
            reply.view('modules/github/view/list');
        });
    }
};
