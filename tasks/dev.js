'use strict';

/**
 * @module core/tasks
 */

/**
 * Starts server in developer mode.
 * @returns {Null} nothing
 */
function dev () {
    require('./helpers/start-server');
}

dev.description = 'Starts server in developer mode.';

module.exports = dev;
