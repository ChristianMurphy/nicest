/**
 * @module team/handler/list
 */

const Team = require('../model/team');

/**
 * Lists all of the teams
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function list(request, reply) {
    Team
        .find({})
        .select('_id name')
        .exec()
        .then((teams) => {
            reply.view('modules/team/view/list', { teams });
        });
}

module.exports = list;
