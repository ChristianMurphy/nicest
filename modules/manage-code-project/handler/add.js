'use strict';

/**
 * @module manage-code-project/handler/add
 */

const Projects = require('../../code-project/model/project');
const Users = require('../../user/model/user');

const addUserToGithub = require('../task/add-github-user');
const addUserToSlack = require('../task/add-slack-user');
const addUserToTaiga = require('../task/add-taiga-user');

/**
* Calls function to add user
* @param {Request} request - Hapi request
* @param {Reply} reply - Hapi Reply
* @returns {Null} responds with HTML page
*/
function addUser (request, reply) {
    const githubUsername = request
        .yar
        .get('github-username');
    const githubPassword = request
        .yar
        .get('github-password');
    const projectId = request
        .yar
        .get('project-id');
    const taigaUsername = request
        .yar
        .get('taiga-username');
    const taigaPassword = request
        .yar
        .get('taiga-password');
    const userId = request
        .yar
        .get('user-id');

    /**
     * @param {Project} project - project information
     * @param {User} user - user information
     * @returns {Null} responds with HTML page
     */
    function performUser (project, user) {
        const githubName = user[0].modules.github.email;
        let githubUrl = project[0]['github-url'];

        githubUrl = githubUrl.substr(githubUrl.indexOf('/') + 1);

        addUserToGithub(githubUsername, githubPassword, githubUrl, githubName)
            .then(() => {
                const slackToken = project[0]['slack-token'];
                const slackEmail = user[0].modules.slack.email;
                const slackGroups = project[0]['slack-groups'];

                if (project[0]['slack-token'] !== null) {
                    addUserToSlack(slackToken, slackEmail, slackGroups);
                }
            })
            .then(() => {
                const taigaSlug = project[0]['taiga-slug'];
                const taigaEmail = user[0].modules.taiga.email;

                if (taigaSlug !== null) {
                    addUserToTaiga(taigaUsername, taigaPassword, taigaSlug, taigaEmail);
                }
            })
            .then(() => {
                reply.view('modules/manage-code-project/view/success');
            })
            .catch((error) => {
                const errorInfo = {Test: error};

                reply.view('modules/manage-code-project/view/error', errorInfo);
            });
    }

    /**
     * Gets users information
     * @param {Project} project - project information that user will be added to
     * @returns {Null} calls preformUser function
     */
    function getUser (project) {
        Users
            .find(userId)
            .then((user) => {
                performUser(project, user);
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

module.exports = addUser;
