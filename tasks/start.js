'use strict';

const processManager = require('pm2');
const path = require('path');

/**
 * Starts the server as a system service.
 * This allows for running on a production server.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function start (done) {
    processManager.connect(function () {
        processManager.start(
            {
                name: 'nicest',
                script: path.resolve(__dirname, 'helpers', 'start-server.js')
            },
            function () {
                processManager.disconnect(done);
            }
        );
    });
}

start.description = 'Starts the nicest as a system service.';

module.exports = start;
