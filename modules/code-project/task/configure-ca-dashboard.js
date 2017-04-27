'use strict';

/**
 * @module code-project/task/configure-ca-dashboard
 */

const http = require('http');
const request = require('request');
const requestWithCookies = request.defaults({jar: true});
const querystring = require('querystring');

const User = require('../../user/model/user');
const Team = require('../../team/model/team');
const Course = require('../../course/model/course');

/**
 * Promise wrapper for request, abstracts the http api
 * @private
 * @param {Object} data - request object
 * @returns {Promise.<String>} promise will resolve to response body or reject with error code
 */
function requestPromise (data) {
    return new Promise((resolve, reject) => {
        requestWithCookies(data, (error, headers, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

/**
 * Send project metadata to CAssess via an HTTP POST method.
 * @param {String} cassessUsername - CAssess admin username
 * @param {String} cassessPassword = CAssess admin password
 * @param {String} cassessUrl - CAssess base URL
 * @param {Array} metaData - {Array} of {Project} with Project info
 * @returns {Null} returns after completion
 */
function configureCaDashboard (cassessUsername, cassessPassword, cassessUrl, metaData) {
    const [project] = metaData;
    const githubOwner = project['github-url'].substr(0, project['github-url'].indexOf('/'));

    let courseName = null;
    let endDate = null;

    const teams = [];
    const admins = [];

    // Login to CAssess.
    const qs = querystring.stringify({
        password: cassessPassword,
        rememberme: true,
        username: cassessUsername
    });

    // Store the authentication cookie in a cookie jar.
    const cookieJar = requestWithCookies.jar();

    requestPromise({
        jar: cookieJar,
        json: 'true',
        method: 'POST',
        uri: `${cassessUrl}/authenticate?${qs}`
    })

        // Construct the JSON payload.
        .then(() => {
            Course
                .findOne({_id: project.course})
                .exec()
                .then((course) => {
                    courseName = course.name;
                    endDate = course.modules['end-date'];

                    const promises = [];

                    // Query metadata for each team.
                    for (let teamIndex = 0; teamIndex < metaData.length; teamIndex += 1) {
                        const teamMetadata = {};
                        const studentMetadata = [];

                        promises.push(
                        Team
                            .findOne({_id: metaData[teamIndex].team})
                            .exec()
                            .then((team) => {
                                teamMetadata.team_name = team.name;

                                // Collect promises for all user queries.
                                const userPromises = [];

                                // Get list of student metadata for each member in team.
                                const studentCount = metaData[teamIndex].members.length;

                                for (let userIndex = 0; userIndex < studentCount; userIndex += 1) {
                                    userPromises.push(
                                    User
                                        .findOne({_id: metaData[teamIndex].members[userIndex]})
                                        .exec()
                                        .then((student) => {
                                            studentMetadata.push({
                                                email: student.modules.cassess.email,
                                                full_name: student.name,
                                                password: student.modules.cassess.password
                                            });
                                        })
                                    );
                                }

                                // Get instructor metadata.
                                const instructorCount = metaData[teamIndex].instructors.length;

                                for (let userIndex = 0; userIndex < instructorCount; userIndex += 1) {
                                    userPromises.push(
                                    User
                                        .findOne({_id: metaData[teamIndex].instructors[userIndex]})
                                        .exec()
                                        .then((instructor) => {
                                            // Instructors are the same for all teams.
                                            if (teamIndex === 0) {
                                                admins.push({
                                                    email: instructor.modules.cassess.email,
                                                    full_name: instructor.name,
                                                    password: instructor.modules.cassess.password
                                                });
                                            }
                                        })
                                    );
                                }

                                return Promise.all(userPromises).then(() => {
                                    teamMetadata.students = studentMetadata;
                                });
                            })
                            .then(() => {
                                const team = metaData[teamIndex];

                                // Get only the repository name.
                                const url = team['github-url'];
                                const githubRepo = url.substr(url.indexOf('/') + 1, url.length);

                                // Get slack channel IDs for a team.
                                const channels = [];

                                for (let userIndex = 0; userIndex < team['slack-groups'].length; userIndex += 1) {
                                    channels.push({id: team['slack-groups'][userIndex]});
                                }

                                teamMetadata.students = studentMetadata;
                                teamMetadata.channels = channels;
                                teamMetadata.taiga_project_slug = team['taiga-slug'];
                                teamMetadata.github_repo_id = githubRepo;
                                teams.push(teamMetadata);

                                return null;
                            })
                        );
                    }

                    return Promise.all(promises);
                })

                // Send POST request to CAssess.
                .then(() => {
                    const payload = {
                        admins,
                        course: courseName,
                        end_date: endDate,
                        github_owner: githubOwner,
                        github_token: project['github-token'],
                        slack_team_id: project['slack-team-id'],
                        slack_token: project['slack-token'],
                        taiga_token: project['taiga-token'],
                        teams
                    };

                    // Output JSON payload for debugging purposes.
                    console.log();
                    console.log(JSON.stringify(payload));
                    console.log(`POST request made to ${cassessUrl}/rest/coursePackage\n`);

                    // Send the JSON payload to CAssess.
                    const options = {
                        headers: {
                            'cache-control': 'no-cache',
                            'content-type': 'application/json',
                            cookie: cookieJar.getCookieString(cassessUrl)
                        },
                        hostname: 'cassess.fulton.asu.edu',
                        method: 'POST',
                        path: '/cassess/rest/coursePackage',
                        port: '8080'
                    };

                    const req = http.request(options, (res) => {
                        const chunks = [];

                        res.on('data', (chunk) => {
                            chunks.push(chunk);
                        });

                        res.on('end', () => {
                            const body = Buffer.concat(chunks);

                            console.log(body.toString());
                        });
                    });

                    req.write(JSON.stringify(payload));
                    req.end();
                });
        })
        .catch((err) => {
            request.log('error', err.toString());
        });
}

module.exports = configureCaDashboard;
