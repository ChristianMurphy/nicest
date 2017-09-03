'use strict';

/**
 * @module import-export/task/import-users
 */

const User = require('../../user/model/user');

/**
 * Adds Users to Mongoose
 * @param {Object} documentAndMapping - XML document and Array of ObjectId mappings
 * @returns {Object} XML document and User ObjectId mappings
 */
function importUsers (documentAndMapping) {
    // Find all the users
    const users = documentAndMapping
        .document
        .find('//user');
    const promises = [];

    // For each user
    for (const currentUser of users) {
        const firstName = currentUser
            .get('first-name')
            .text();
        const lastName = currentUser
            .get('last-name')
            .text();

        // Create a new database object
        promises.push(User
            .create({
                modules: {
                    github: {
                        username: currentUser
                            .get('github')
                            .text()
                    },
                    taiga: {
                        email: currentUser
                            .get('email')
                            .text()
                    }
                },
                name: `${firstName} ${lastName}`
            })
            .then((newUser) => ({
                databaseId: newUser._id,
                xmlId: currentUser
                    .attr('id')
                    .value()
            })));
    }

    // Wait for all users to be created
    return Promise
        .all(promises)
        .then((identifierMapping) => {
            documentAndMapping.mapping = documentAndMapping
                .mapping
                .concat(identifierMapping);

            return documentAndMapping;
        });
}

module.exports = importUsers;
