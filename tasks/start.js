'use strict';

const processManager = require('pm2');
const path = require('path');

/**
 * Starts the server as a system service.
 * This allows for running on a production server.
 * @returns {Null} nothing
 */
function start () {
    processManager.connect(() => {
        processManager.start(
            {
                name: 'nicest',
                script: path.resolve(__dirname, 'helpers', 'start-server.js')
            },
            () => {
                processManager.disconnect();
            }
        );
    });
}

start.description = 'Starts the nicest as a system service.';

module.exports = start;
