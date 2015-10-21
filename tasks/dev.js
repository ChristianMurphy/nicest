'use strict';

/**
 * Starts server in developer mode.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function dev () {
    require('./helpers/start-server');
}

dev.description = 'Starts server in developer mode.';

module.exports = dev;
