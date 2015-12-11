'use strict';

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Checks that the Javascript code is valid.
 * @returns {Null} nothing
 */
function lint () {
    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['lint'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
        });
    });
}

lint.description = 'Checks that the Javascript code is valid.';

module.exports = lint;
