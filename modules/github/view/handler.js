'use strict';

const Github = require('octokat');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/github/choose');
    },
    choose: function (request, reply) {
        Github.
    },
    list: function (request, reply) {
        
    }
};
