'use strict';

/**
 * @module manage-code-project/handler/transfer-choose-newteam
 */

const Projects = require('../../code-project/model/project');

/**
 * Allows user to choose team that user will be transfered to
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @param {Project} projects - project information
 * @returns {Null} responds with HTML page
 */
function presentView (request, reply, projects) {
    const oldTeam = request
        .yar
        .get('oldTeam');

    const availableTeams = [];

    projects.forEach((project) => {
        if (project._id.toString() !== oldTeam._id) {
            availableTeams.push(project);
        }
    });
    const viewInfo = {projects: availableTeams};

    reply.view('modules/manage-code-project/view/transfer-choose-newteam', viewInfo);
}

/**
 * Gets the project in Nicest
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls presentView function
 */
function getProjects (request, reply) {
    const course = request
        .yar
        .get('course');

    Projects
        .find(course)
        .then((projects) => {
            presentView(request, reply, projects);
        });
}

 /**
  * Allows user to choose team that user will be transfered to
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserNewTeamTransfer (request, reply) {
    getProjects(request, reply);
}

module.exports = chooseUserNewTeamTransfer;
