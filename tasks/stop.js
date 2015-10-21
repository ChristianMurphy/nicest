'use strict';

const processManager = require('pm2');

/**
 * Stops the server system service.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function stop (done) {
    processManager.connect(function () {
        processManager.delete('nicest', function () {
            processManager.disconnect(done);
        });
    });
}

stop.description = 'Stops the server system service.';

module.exports = stop;
