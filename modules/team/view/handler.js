'use strict';

const Team = require('../model/team');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/manage-teams/list');
    },
    list: function (request, reply) {
        Team
            .list()
            .then(function (teamIds) {
                reply.view('modules/team/view/list', {teamIds: teamIds});
            });
    }
};
