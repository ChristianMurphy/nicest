/**
 * @module import-export/handler/download-xml
 */

const validate = require('../task/validate');
const importUsers = require('../task/import-users');
const importTeams = require('../task/import-teams');
const importCourses = require('../task/import-courses');
const example = require('../task/example');

/**
 * Import page view, with import status
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function downloadXML(request, reply) {
    validate(request.payload.file.path)
        .then(importUsers)
        .then(importTeams)
        .then(importCourses)
        .then(() => {
            reply.view(
                'modules/import-export/view/import',
                {
                    example,
                    validation: {
                        done: true,
                        valid: true,
                    },
                },
            );
        })
        .catch((err) => {
            reply.view(
                'modules/import-export/view/import',
                {
                    example,
                    validation: {
                        done: true,
                        errors: err,
                        valid: false,
                    },
                },
            );
        });
}

module.exports = downloadXML;
