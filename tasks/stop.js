'use strict';

const processManager = require('pm2');

/**
 * Stops the server system service.
 * @returns {Null} nothing
 */
function stop () {
    processManager.connect(function () {
        processManager.delete('nicest', function () {
            processManager.disconnect();
        });
    });
}

stop.description = 'Stops the server system service.';

module.exports = stop;
