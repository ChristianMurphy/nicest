'use strict';

const importData = require('../task/import');
const example = require('../task/example');

module.exports = {
    redirect: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/import-export/import-xml`);
    },
    importXML: function (request, reply) {
        reply.view('modules/import-export/view/import', {
            example: example,
            validation: {
                valid: true,
                done: false
            }
        });
    },
    downloadXML: function (request, reply) {
        importData(request.payload.file.path).then((result) => {
            reply.view('modules/import-export/view/import', {
                example: example,
                validation: result
            });
        });
    }
};
