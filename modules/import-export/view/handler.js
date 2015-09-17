'use strict';

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/import-export/import-xml');
    },
    importXML: function (request, reply) {
        reply.view('modules/import-export/view/import');
    }
};
