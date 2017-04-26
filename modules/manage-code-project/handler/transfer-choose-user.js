'use strict';

/**
 * @module manage-code-project/handler/transfer-choose-user
 */

const Projects = require('../../code-project/model/project');
const Teams = require('../../team/model/team');
const Users = require('../../user/model/user');

/**
 * Allows user to select user to be transfered
 * @param {Team} team - team information
 * @param {User} users - user information
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function presentView (team, users, reply) {
    const usersInTeam = [];

    users.forEach((user) => {
        if (team[0].members.indexOf(user._id) !== -1) {
            if (usersInTeam.indexOf(user) === -1 && user.role === 'student') {
                usersInTeam.push(user);
            }
        }
    });

    const viewInfo = {users: usersInTeam};

    reply.view('modules/manage-code-project/view/transfer-choose-user', viewInfo);
}

/**
 * Gets the all users
 * @param {Team} team - team information
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls presentView function
 */
function getUsers (team, reply) {
    Users
        .find({})
        .then((users) => {
            presentView(team, users, reply);
        });
}

/**
 * Gets the team for project
 * @param {Object} teamId -teamId argument to query Team collection to get team associated with project
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls getUsers function
 */
function getTeam (teamId, reply) {
    Teams
        .find(teamId)
        .then((team) => {
            getUsers(team, reply);
        });
}

/**
 * Gets the project that was choosen
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls getTeam function
 */
function getProject (request, reply) {
    Projects
        .find(request.query)
        .then((project) => {
            const argument = {};

            argument._id = project[0].team.toString();
            getTeam(argument, reply);
        });
}

 /**
  * Allows user to select user to be transfered
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserTransfer (request, reply) {
    request
        .yar
        .set({oldTeam: request.query});

    getProject(request, reply);
}

module.exports = chooseUserTransfer;
