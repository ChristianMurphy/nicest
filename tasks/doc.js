'use strict';

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Turns documentation comments into viewable wep pages.
 * @function doc
 * @returns {Null} nothing
 */
function doc () {
    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['documentation'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
        });
    });
}

doc.description = 'Turns documentation comments into viewable web pages.';

module.exports = doc;
