'use strict';

const request = require('request');

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
    .then(function (data) {
        authorizationToken = data.auth_token;
        console.log(authorizationToken);
    });
};

function requestPromise (data) {
    return new Promise(function (resolve, reject) {
        request(data, function (error, request, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
