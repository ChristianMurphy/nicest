'use strict';

const importData = require('../task/import');
const example = require('../task/example');

module.exports = {
    redirect (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/import-export/import-xml`);
    },
    importXML (request, reply) {
        reply.view('modules/import-export/view/import', {
            example,
            validation: {
                valid: true,
                done: false
            }
        });
    },
    downloadXML (request, reply) {
        importData(request.payload.file.path).then((validation) => {
            reply.view('modules/import-export/view/import', {example, validation});
        });
    }
};
