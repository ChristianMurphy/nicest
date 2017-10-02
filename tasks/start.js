/**
 * @module core/tasks/start
 */

/**
 * Starts the server as a system service.
 * This allows for running on a production server.
 * @returns {Null} nothing
 */
function start() {
    // eslint-disable-next-line global-require
    const processManager = require('pm2');
    // eslint-disable-next-line global-require
    const path = require('path');

    processManager.connect(() => {
        processManager.start(
            {
                name: 'nicest',
                script: path.resolve(__dirname, 'helpers', 'start-server.js'),
            },
            () => {
                processManager.disconnect();
            },
        );
    });
}

start.description = 'Starts the nicest as a system service.';

module.exports = start;
