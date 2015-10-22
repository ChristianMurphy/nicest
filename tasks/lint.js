'use strict';

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Checks that the Javascript code is valid.
 * @returns {Null} nothing
 */
function lint () {
    npm.load(npmPackage, function (err) {
        if (err) {
            console.log(err);
        }
        npm.commands.runScript(['lint'], function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

lint.description = 'Checks that the Javascript code is valid.';

module.exports = lint;
