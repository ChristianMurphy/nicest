'use strict';

/**
 * @module import-export/handler/download-xml
 */

const importData = require('../task/import');
const example = require('../task/example');

/**
 * Import page view, with import status
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function downloadXML (request, reply) {
    importData(request.payload.file.path).then((validation) => {
        reply.view('modules/import-export/view/import', {example, validation});
    })
    .catch((err) => {
        console.error(err);
    });
}

module.exports = downloadXML;
