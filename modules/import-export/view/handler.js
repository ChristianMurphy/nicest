'use strict';

const importData = require('../task/import');
const example = require('../task/example');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/import-export/import-xml');
    },
    importXML: function (request, reply) {
        reply.view('modules/import-export/view/import', {
            example: example,
            validation: {
                valid: true
            }
        });
    },
    downloadXML: function (request, reply) {
        importData(request.payload.file.path).then(function (result) {
            reply.view('modules/import-export/view/import', {
                example: example,
                validation: result
            });
        });
    }
};
