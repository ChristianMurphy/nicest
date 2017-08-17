'use strict';

/**
 * @module manage-code-project/handler/remove
 */

const Projects = require('../../code-project/model/project');
const Users = require('../../user/model/user');

const removeUserGithub = require('../task/remove-github-user');
const removeUserSlack = require('../task/remove-slack-user');

 /**
  * Calls functions to remove user
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function removeUser (request, reply) {
    const githubUsername = request
        .yar
        .get('github-username');

    const githubPassword = request
        .yar
        .get('github-password');

    const projectId = request
        .yar
        .get('project-id');

    const userId = request
        .yar
        .get('user-id');

    /**
     * @param {Project} project - project information
     * @param {User} user - user information
     * @returns {Null} responds with HTML page
     */
    function performRemoveUser (project, user) {
        const githubName = user[0].modules.github.email;

        let githubUrl = project[0]['github-url'];

        githubUrl = githubUrl.substr(githubUrl.indexOf('/') + 1);

        removeUserGithub(githubUsername, githubPassword, githubUrl, githubName)
            .then(() => {
                const slackToken = project[0]['slack-token'];
                const slackGroups = project[0]['slack-groups'];

                if (slackToken !== null) {
                    removeUserSlack(slackToken, slackGroups);
                }
            })
            .then(() => {
                reply.view('modules/manage-code-project/view/success');
            })
            .catch(() => {
                reply.view('modules/manage-code-project/view/error');
            });
    }

    /**
     * Gets the users in the team
     * @param {Project} project -project object
     * @returns {Null} calls performRemoveUser function
     */
    function getUser (project) {
        Users
            .find(userId)
            .then((user) => {
                performRemoveUser(project, user);
            });
    }

    /**
     * Gets the project that was choosen
     * @returns {Null} calls getUser function
     */
    function getProject () {
        Projects
            .find(projectId)
            .then((project) => {
                getUser(project);
            });
    }

    getProject();
}

module.exports = removeUser;
