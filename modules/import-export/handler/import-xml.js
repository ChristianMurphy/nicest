'use strict';

/**
 * @module import-export/handler/import-xml
 */

const example = require('../task/example');

/**
 * Import page view
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function importXML (request, reply) {
    reply.view('modules/import-export/view/import', {
        example,
        validation: {
            valid: true,
            done: false
        }
    });
}

module.exports = importXML;
