/**
 * @module core/tasks/stop
 */

/**
 * Stops the server system service.
 * @returns {Null} nothing
 */
function stop() {
    // eslint-disable-next-line global-require
    const processManager = require('pm2');

    processManager.connect(() => {
        processManager.delete('nicest', () => {
            processManager.disconnect();
        });
    });
}

stop.description = 'Stops the server system service.';

module.exports = stop;
