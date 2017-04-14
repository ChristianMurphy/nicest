'use strict';

/**
 * @module code-project/task/create-taiga-boards
 */

const request = require('request');

/**
 * Promise wrapper for request, abstracts the http api
 * @private
 * @param {Object} data - request object
 * @returns {Promise.<String>} promise will resolve to response body or reject with error code
 */
function requestPromise (data) {
    return new Promise((resolve, reject) => {
        request(data, (error, headers, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

/**
 * TaigaBoard is meta data for creating a single board.
 * @typedef {Object} TaigaBoard
 * @property {String} name - name of the board
 * @property {Array} members - {Array} of {String} with emails
 */

/**
 * TaigaOptions is meta data that can be used on all boards.
 * @typedef {Object} TaigaOptions
 * @property {String} description - description of the board
 * @property {Boolean} isPrivate - choose whether repo is public or private
 * @property {Boolean} isBacklogActived - choose whether or not to have a backlog
 * @property {Boolean} isIssuesActived - choose whether or not to have issues
 * @property {Boolean} isKanbanActivated - choose whether or not to use Kanban
 * @property {Boolean} isWikiActivated - choose whether or not to have a project wiki
 */

/**
 * Takes in Taiga meta data and create boards for each
 * @param {String} taigaUsername - Taiga admin username
 * @param {String} taigaPassword - Taiga admin password
 * @param {Array} taigaBoards - an {Array} of {TaigaBoard}
 * @param {TaigaOptions} taigaOptions - shared options for all boards
 * @returns {Promise} resolves when boards have been created
 */
function createTaigaBoards (taigaUsername, taigaPassword, taigaBoards, taigaOptions) {
    let authorizationToken = null;

    // Login to Taiga
    return requestPromise({
        body: {
            password: taigaPassword,
            type: 'normal',
            username: taigaUsername
        },
        json: true,
        method: 'POST',
        uri: 'https://api.taiga.io/api/v1/auth'
    })
        .then((data) => {
            // Store authorization token for later
            authorizationToken = data.auth_token;

            // Setup shared meta for boards
            const boardMetaData = {
                description: taigaOptions.description,
                is_backlog_activated: taigaOptions.isBacklogActived,
                is_issues_activated: taigaOptions.isIssuesActived,
                is_kanban_activated: taigaOptions.isKanbanActivated,
                is_private: taigaOptions.isPrivate,
                is_wiki_activated: taigaOptions.isWikiActivated
            };

            // Collect promises for all boards
            const promises = [];

            // Create each board
            for (const index in taigaBoards) {
                // Set the name
                boardMetaData.name = taigaBoards[index].name;
                // Create board
                promises.push(
                requestPromise({
                    body: boardMetaData,
                    headers: {Authorization: `Bearer ${authorizationToken}`},
                    json: true,
                    method: 'POST',
                    uri: 'https://api.taiga.io/api/v1/projects'
                })
            );
            }

            // Wait for all boards to be created
            return Promise.all(promises);
        })
        .then((data) => {
            const promises = [];

            // For each person in each project
            for (const boardIndex in taigaBoards) {
                for (const userIndex in taigaBoards[boardIndex].emails) {
                    const taigaRoles = data[boardIndex].roles;
                    // Setup the members permissions
                    const userMetadata = {
                        email: taigaBoards[boardIndex].emails[userIndex],
                        project: data[boardIndex].id,
                        role: taigaRoles
                            .find((element) => element.name === 'Back')
                            .id
                    };

                    // Add them to the taiga board
                    promises.push(
                    requestPromise({
                        body: userMetadata,
                        headers: {Authorization: `Bearer ${authorizationToken}`},
                        json: true,
                        method: 'POST',
                        uri: 'https://api.taiga.io/api/v1/memberships'
                    })
                );
                }
            }

            return Promise.all(promises)
                .then(() => authorizationToken);
        });
}

module.exports = createTaigaBoards;
