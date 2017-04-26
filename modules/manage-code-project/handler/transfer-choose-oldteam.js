'use strict';

/**
 * @module manage-code-project/handler/transfer-choose-oldteam
 */

const Projects = require('../../code-project/model/project');

/**
 * Allows user to choose team that user will be transfered from
 * @param {Projects} projects - project information
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function presentView (projects, reply) {
    const viewInfo = {projects};

    reply.view('modules/manage-code-project/view/transfer-choose-oldteam', viewInfo);
}

/**
 * Gets the project in Nicest
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls presentView
 */
function getProjects (request, reply) {
    Projects
        .find(request.query)
        .then((projects) => {
            presentView(projects, reply);
        });
}

 /**
  * Allows user to choose team that user will be transfered from
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserOldTeamTransfer (request, reply) {
    request
        .yar
        .set({course: request.query});

    getProjects(request, reply);
}

module.exports = chooseUserOldTeamTransfer;
