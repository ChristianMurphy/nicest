/* eslint max-nested-callbacks: [2, 2] */
'use strict';
/**
 * @module CreateTaigaBoards
 */
const request = require('request');
const _ = require('lodash');

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
 * @function CreateTaigaBoards
 * @param {String} taigaUsername - Taiga admin username
 * @param {String} taigaPassword - Taiga admin password
 * @param {Array} taigaBoards - an {Array} of {TaigaBoard}
 * @param {TaigaOptions} taigaOptions - shared options for all boards
 * @returns {Promise} resolves when boards have been created
 */
module.exports = function (taigaUsername, taigaPassword, taigaBoards, taigaOptions) {
    let authorizationToken;

    // login to Taiga
    requestPromise({
        method: 'POST',
        uri: 'https://api.taiga.io/api/v1/auth',
        json: true,
        body: {
            type: 'normal',
            username: taigaUsername,
            password: taigaPassword
        }
    })
    .then((data) => {
        // store authorization token for later
        authorizationToken = data.auth_token;

        // setup shared meta for boards
        const boardMetaData = {
            description: taigaOptions.description,
            is_private: taigaOptions.isPrivate,
            is_backlog_activated: taigaOptions.isBacklogActived,
            is_issues_activated: taigaOptions.isIssuesActived,
            is_kanban_activated: taigaOptions.isKanbanActivated,
            is_wiki_activated: taigaOptions.isWikiActivated
        };

        // collect promises for all boards
        const promises = [];

        // create each board
        for (let index = 0; index < taigaBoards.length; index++) {
            // set the name
            boardMetaData.name = taigaBoards[index].name;
            // create board
            promises.push(
                requestPromise({
                    method: 'POST',
                    uri: 'https://api.taiga.io/api/v1/projects',
                    headers: {
                        Authorization: `Bearer ${authorizationToken}`
                    },
                    json: true,
                    body: boardMetaData
                })
            );
        }

        // wait for all boards to be created
        return Promise.all(promises);
    })
    .then((data) => {
        const promises = [];

        // for each person in each project
        for (let boardIndex = 0; boardIndex < taigaBoards.length; boardIndex++) {
            for (let userIndex = 0; userIndex < taigaBoards[boardIndex].emails.length; userIndex++) {
                // setup the members permissions
                const userMetadata = {
                    project: data[boardIndex].id,
                    role: _.find(data[boardIndex].roles, _.matches({name: 'Back'})).id,
                    email: taigaBoards[boardIndex].emails[userIndex]
                };

                // add them to the taiga board
                promises.push(
                    requestPromise({
                        method: 'POST',
                        uri: 'https://api.taiga.io/api/v1/memberships',
                        headers: {
                            Authorization: `Bearer ${authorizationToken}`
                        },
                        json: true,
                        body: userMetadata
                    })
                );
            }
        }

        return Promise.all(promises);
    });
};

/**
 * Promise wrapper for request, abstracts the http api
 * @function requestPromise
 * @private
 * @param {Object} data - request object
 * @returns {Promise.<String>} promise will resolve to response body or reject with error code
 */
function requestPromise (data) {
    return new Promise((resolve, reject) => {
        request(data, (error, request, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
