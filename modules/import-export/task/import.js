'use strict';

/**
 * @module import-export/task/import
 */

const libxml = require('libxmljs');
const fs = require('fs');
const path = require('path');

const User = require('../../user/model/user');
const Team = require('../../team/model/team');

const schema = fs.readFileSync(path.join(__dirname, 'schema.xsd'));
const parsedSchema = libxml.parseXmlString(schema);

/**
 * Reads in an XML file and stores data to database
 * @param {String} location - path to XML file
 * @returns {Promise.<Object>} resolves with validation status
 */
function importXML (location) {
    let parsedDateset;

    // Check that the XML document is valid
    return readFilePromise(location).then((dataset) => {
        // parse the new file
        parsedDateset = libxml.parseXmlString(dataset);
        // validate the file
        const isValid = parsedDateset.validate(parsedSchema);

        return {
            valid: isValid,
            done: true,
            errors: parsedDateset.validationErrors
        };
    })

    // Copy users to Mongoose
    .then((result) => {
        // if the result is valid generate users and teams
        if (result.valid) {
            // find all the users
            const users = parsedDateset.find('//user');
            const promises = [];

            // for each user
            for (let index = 0; index < users.length; index += 1) {
                const currentUser = users[index];

                // create a new database object
                promises.push(
                    User.create({
                        name: `${currentUser.get('first-name').text()} ${currentUser.get('last-name').text()}`,
                        modules: {
                            github: {
                                username: currentUser.get('github').text()
                            },
                            taiga: {
                                email: currentUser.get('email').text()
                            }
                        }
                    })
                    .then((newUser) => {
                        // map the XML id to the Mongoose id
                        return {
                            databaseId: newUser._id,
                            xmlId: currentUser.attr('id').value()
                        };
                    })
                );
            }

            // wait for all users to be created
            return Promise.all(promises).then((identifierMapping) => {
                result.identifierMapping = identifierMapping;
                return result;
            });
        }

        return result;
    })

    // copy teams to Mongoose
    .then((result) => {
        // if the result is valid generate users and teams
        if (result.valid) {
            // find all the users
            const teams = parsedDateset.find('//team');
            const promises = [];

            // for each user
            for (let teamIndex = 0; teamIndex < teams.length; teamIndex += 1) {
                // gather all team members for current team
                const teamMembers = teams[teamIndex].find('member');
                const teamMetadata = {
                    members: []
                };

                // set the team name
                teamMetadata.name = teams[teamIndex].get('name').text();

                // get each of the team members' ids
                for (let memberIndex = 0; memberIndex < teamMembers.length; memberIndex += 1) {
                    const memberXmlId = teamMembers[memberIndex].attr('id').value();
                    const memberMongoId = result
                        .identifierMapping
                        .find((element) => {
                            return element.xmlId === memberXmlId;
                        })
                        .databaseId;

                    teamMetadata.members.push(memberMongoId);
                }

                // copy the team to Mongoose
                promises.push(Team.create(teamMetadata));
            }

            // wait for all teams to be created
            return Promise.all(promises).then(() => {
                return result;
            });
        }
        return result;
    });
}

module.exports = importXML;

/**
 * Promise wrapper for fs.readFile
 * @private
 * @param {String} location - path to file
 * @returns {Promise.<String>} resolves with data or rejects with error
 */
function readFilePromise (location) {
    return new Promise((resolve, reject) => {
        fs.readFile(location, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
