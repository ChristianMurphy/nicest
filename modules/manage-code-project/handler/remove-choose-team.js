'use strict';

/**
 * @module manage-code-project/handler/remove-choose-team
 */

const Projects = require('../../code-project/model/project');

/**
 * Presents a view for a user to choose a team
 * @param {Projects} projects - projects that are associated with the course
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page that allows user to choose a team that student will be removed
 */
function presentView (projects, reply) {
    const viewInfo = {projects};

    reply.view('modules/manage-code-project/view/remove-choose-team', viewInfo);
}

/**
 * Gets all projects associated with choosen course in Nicest
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls presentView function
 */
function getProjects (request, reply) {
    Projects
        .find(request.query)
        .then((projects) => {
            presentView(projects, reply);
        });
}

 /**
  * Allows user to remove a member from a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserTeamRemove (request, reply) {
    getProjects(request, reply);
}

module.exports = chooseUserTeamRemove;
