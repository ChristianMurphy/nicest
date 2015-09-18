/* eslint no-sync: 0, max-nested-callbacks: [2, 2], no-else-return: 0 , no-underscore-dangle: 0 */
'use strict';

const libxml = require('libxmljs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const User = require('../../user/model/user');
const Team = require('../../team/model/team');

const schema = fs.readFileSync(path.join(__dirname, 'schema.xsd'));
const parsedSchema = libxml.parseXmlString(schema);

module.exports = function (location) {
    let parsedDateset;

    // Check that the XML document is valid
    return readFilePromise(location).then(function (dataset) {
        // parse the new file
        parsedDateset = libxml.parseXmlString(dataset);
        // validate the file
        const isValid = parsedDateset.validate(parsedSchema);

        return {
            valid: isValid,
            errors: parsedDateset.validationErrors
        };
    })

    // Copy users to Mongoose
    .then(function (result) {
        // if the result is valid generate users and teams
        if (result.valid) {
            // find all the users
            const users = parsedDateset.find('//user');
            const promises = [];

            // for each user
            for (let index = 0; index < users.length; index++) {
                const currentUser = users[index];

                // create a new database object
                promises.push(
                    User.create({
                        name: currentUser.get('first-name').text() + ' ' + currentUser.get('last-name').text(),
                        modules: {
                            github: {
                                username: currentUser.get('github').text()
                            },
                            taiga: {
                                email: currentUser.get('email').text()
                            }
                        }
                    }).then(function (newUser) {
                        // map the XML id to the Mongoose id
                        return {
                            databaseId: newUser._id,
                            xmlId: currentUser.attr('id').value()
                        };
                    })
                );
            }

            // wait for all users to be created
            return Promise.all(promises).then(function (identifierMapping) {
                result.identifierMapping = identifierMapping;
                return result;
            });
        } else {
            return result;
        }
    })

    // copy teams to Mongoose
    .then(function (result) {
        // if the result is valid generate users and teams
        if (result.valid) {
            // find all the users
            const teams = parsedDateset.find('//team');
            const promises = [];

            // for each user
            for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
                // gather all team members for current team
                const teamMembers = teams[teamIndex].find('member');
                const teamMetadata = {
                    members: []
                };

                // set the team name
                teamMetadata.name = teams[teamIndex].get('name').text();

                // get each of the team members' ids
                for (let memberIndex = 0; memberIndex < teamMembers.length; memberIndex++) {
                    const memberXmlId = teamMembers[memberIndex].attr('id').value();
                    const memberMongoId = _.find(result.identifierMapping, 'xmlId', memberXmlId).databaseId;

                    teamMetadata.members.push(memberMongoId);
                }

                // copy the team to Mongoose
                promises.push(Team.create(teamMetadata));
            }

            // wait for all teams to be created
            return Promise.all(promises).then(function () {
                return result;
            });
        } else {
            return result;
        }
    });
};

/**
 * Promise wrapper for fs.readFile
 * @private
 * @param {String} path - path to file
 * @returns {Promise} resolves with data or rejects with error
 */
function readFilePromise (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
