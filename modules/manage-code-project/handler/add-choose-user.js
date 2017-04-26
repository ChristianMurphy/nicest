'use strict';

/**
 * @module manage-code-project/handler/add-choose-user
 */

const Projects = require('../../code-project/model/project');
const Teams = require('../../team/model/team');
const Users = require('../../user/model/user');

/**
 * Presents a view for a user to choose an user
 * @param {Team} team - team information that user will be added to
 * @param {Users} users - all users in team
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page that allows user to choose course that student will be added
 */
function presentView (team, users, reply) {
    const usersInTeam = [];

    users.forEach((user) => {
        if (team[0].members.indexOf(user._id) === -1) {
            if (usersInTeam.indexOf(user) === -1 && user.role === 'student') {
                usersInTeam.push(user);
            }
        }
    });

    const viewInfo = {users: usersInTeam};

    reply.view('modules/manage-code-project/view/add-choose-user', viewInfo);
}

/**
 * Gets the all users
 * @param {Team} team - team information that user will be added to
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls getTeam function passing the team and all users
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
 * @returns {Null} calls getTeam function
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
  * Allows user to select a user to be added
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserAdd (request, reply) {
    getProject(request, reply);
}

module.exports = chooseUserAdd;
