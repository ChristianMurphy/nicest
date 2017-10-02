/**
 * @module core/tasks/dev
 */

/**
 * Starts server in developer mode.
 * @returns {Null} nothing
 */
function dev() {
    // eslint-disable-next-line global-require
    require('./helpers/start-server');
}

dev.description = 'Starts server in developer mode.';

module.exports = dev;
